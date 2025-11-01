import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) {}
  
  create(createEmployeeDto: CreateEmployeeDto) {
    console.log(createEmployeeDto);

    const employee = this.employeeRepository.save(createEmployeeDto);

    return employee;
  }

  findAll() {
    return this.employeeRepository.find();
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOneBy( {employeeId: id} );
    
    if(!employee) throw new NotFoundException();

    return employee;
  }

  findByLocation(id: number) {
    console.log(id);
    return this.employeeRepository.findBy({
      location: {
        locationId: id
      }
    });
  } 

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto
    });

    if(!employeeToUpdate) throw new NotFoundException();

    this.employeeRepository.save(employeeToUpdate);

    return employeeToUpdate;
  }

  remove(id: string) {
    this.findOne(id);
    this.employeeRepository.delete( {employeeId: id} );
    return { message: `Employee with id ${id} deleted`};
  }
}
