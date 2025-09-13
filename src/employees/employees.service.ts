import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid} from 'uuid';

@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[] = [{
    id: uuid(),
    name: "Alberto",
    lastName: "Gonzalez",
    phoneNumber: "123456789",
  },
  {
    id: uuid(),
    name: "Maria",
    lastName: "Lopez",
    phoneNumber: "987654321",
  }
  ];

  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid();
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: string) {
    const employee = this.employees.filter((employee) => employee.id === id)[0];
    
    if(!employee) throw new NotFoundException();

    return employee;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    let employeeToUpdate = this.findOne(id); //Buscar el empleado a actualizar

    employeeToUpdate = {  //Actualizar el empleado
      ... employeeToUpdate, //Copiar los datos del empleado encontrado
      ... updateEmployeeDto //Sobreescribir con los datos del DTO
    }

    this.employees = this.employees.map((employee) => { //Actualizar el array de empleados
      if (employee.id === id) {   //Coindicidencia de ID
        employee = employeeToUpdate;  //Actualizar el empleado
      }
      return employee;
    });

    return employeeToUpdate;
  }

  remove(id: string) {
    this.findOne(id);
    this.employees = this.employees.filter((employee) => employee.id !== id);
    return this.employees;
  }
}
