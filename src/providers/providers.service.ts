import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider) 
    private providerRepository: Repository<Provider>
  ) {}

  create(createProviderDto: CreateProviderDto) {
    return this.providerRepository.save(createProviderDto);
  }

  findAll() {
    return this.providerRepository.find();
  }

  findByName(providerName: string) {
    return this.providerRepository.findOneBy( {
      providerName: Like(`%${providerName}%`)
    } );
  }

  findOne(id: string) {
    return this.providerRepository.findOneBy( {providerId: id} );
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const providerToUpdate = await this.providerRepository.preload( {
      providerId: id,
      ...updateProviderDto
    } );

    if (!providerToUpdate) throw new NotFoundException();
        
    return this.providerRepository.save(providerToUpdate);
  }

  remove(id: string) {
    this.findOne(id);
    this.providerRepository.delete( {providerId: id} );
    return { message: `Provider with id ${id} deleted` };
  }
}
