import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[] = [{
    id: 1,
    name: "Alberto",
    lastName: "Gonzalez",
    phoneNumber: "123456789",
  },
  {
    id: 2,
    name: "Maria",
    lastName: "Lopez",
    phoneNumber: "987654321",
  }
  ];

  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length + 1;
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    const employee = this.employees.filter((employee) => employee.id === id)[0];
    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
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

  remove(id: number) {
    this.employees = this.employees.filter((employee) => employee.id !== id);
    return this.employees;
  }
}
