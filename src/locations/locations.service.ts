import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { Manager } from 'src/manager/entities/manager.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
  ) { }

  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto);
  }

  findAll() {
    return this.locationRepository.find({
      relations: {
        employees: true,
      }
    });
  }

  findOne(id: number) {
    const location = this.locationRepository.findOne({
      where: {
        locationId: id
      },
      relations: {
        employees: true,
      }
    });
    if (!location) throw new NotFoundException();
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    //Set manager to null
    this.managerRepository
      .createQueryBuilder()
      .update()
      .set({ location: { locationId: null } })
      .where("locationId = :id", {
        id,
      })
      .execute();

    const locationToUpdate = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
    });
    if (!locationToUpdate) throw new NotFoundException();
    const savedLocation = await this.locationRepository.save(locationToUpdate);

    const updatedManager = await this.managerRepository
      .preload({
        managerId: updateLocationDto.manager,
        location: locationToUpdate,
      });
    if (!updatedManager) throw new NotFoundException();
    this.managerRepository.save(updatedManager);

    return savedLocation;
  }

  remove(id: number) {
    this.findOne(id);
    this.locationRepository.delete({ locationId: id });
    return { message: `Location with id ${id} deleted` };
  }
}
