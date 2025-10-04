import { IsEmail, IsString, IsOptional, MaxLength, IsObject } from 'class-validator';
import { Location } from 'src/locations/entities/location.entity';

export class CreateEmployeeDto{
    @IsString()
    @MaxLength(40)
    employeeName: string;

    @IsString()
    @MaxLength(40)
    employeeLastName: string;

    @IsString()
    @MaxLength(15)
    employeePhoneNumber: string;

    @IsString()
    @IsEmail()
    employeeEmail: string;

    @IsOptional()
    @IsObject()
    location: Location;
}   
