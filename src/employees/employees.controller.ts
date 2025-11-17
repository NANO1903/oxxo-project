import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Location } from 'src/locations/entities/location.entity';
import { Manager } from 'src/manager/entities/manager.entity';
import { Region } from 'src/regions/entities/region.entity';

@ApiAuth()
@ApiBearerAuth()
@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  @Auth(ROLES.MANAGER)
  @ApiBody({ type: CreateEmployeeDto })
  @ApiOperation({ summary: 'Create employee' })
  @ApiResponse({
    status: 201,
    example: {
      employeeId: "UUID",
      employeeName: "Fernando",
      employeeLastName: "Beristain",
      employeePhoneNumber: "44612347891",
      employeeEmail: "fberis@correo.com"
    } as Employee
  })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return "OK";
  }

  @Auth(ROLES.MANAGER, ROLES.ADMIN)
  @ApiResponse({
    status: 200,
    example:
      [
        {
          employeeId: "eea6c450-1384-4a3c-be17-c26f5a68cba5",
          employeeName: "Fernando",
          employeeLastName: "Beristain",
          employeePhoneNumber: "44612347891",
          employeeEmail: "fberis@email.com",
          employeePhoto: "https://example.com/photo.jpg"
        },
        {
          employeeId: "bbd6c450-1384-4a3c-be17-c26f5a68cba5",
          employeeName: "Ana",
          employeeLastName: "Gomez",
          employeePhoneNumber: "44612347892",
          employeeEmail: "agomez@email.com",
          employeePhoto: "https://example.com/photo.jpg"
        }
      ] as Employee[]
  })
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Auth(ROLES.MANAGER)
  @ApiParam({ name: 'uuid', required: true, description: 'Employee UUID', type: String })
  @ApiResponse({
    status: 200,
    example:
      {
        employeeId: "eea6c450-1384-4a3c-be17-c26f5a68cba5",
        employeeName: "Fernando",
        employeeLastName: "Beristain",
        employeePhoneNumber: "44612347891",
        employeeEmail: "fberis@email.com",
        employeePhoto: "https://example.com/photo.jpg"
      } as Employee
  })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.employeesService.findOne(id);
  }
  
  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 200,
    example:
    [
      {
        locationId: 1,
        locationName: "OXXO Centro",
        locationAddress: "Av. Central 123, Col. Centro, Ciudad de México",
        locationLatLng: [19.4326, -99.1332]
      }, 
      {
        locationId: 2,
        locationName: "OXXO Norte",
        locationAddress: "Av. Norte 456, Col. Norte, Ciudad de México",
        locationLatLng: [19.4526, -99.1232]
      } 
    ] as Location[]
  })
  @Get('location/:id')
  findAllLocations(@Param('id') id: string) {   
    return this.employeesService.findByLocation(+id);
  }
  
  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.employeesService.remove(id);
  }
}
