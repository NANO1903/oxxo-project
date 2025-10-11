import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MaxLength, IsObject } from 'class-validator';
import { Location } from '../../locations/entities/location.entity';

export class CreateEmployeeDto{
    @ApiProperty({ type: String, description: "Employee name", example: "Juan", required: true, maxLength: 40, format: "text" })
    @IsString()
    @MaxLength(40)
    employeeName: string;
    
    @ApiProperty({ type: String, description: "Employee last name", example: "Pérez", required: true, maxLength: 40, format: "text" })
    @IsString()
    @MaxLength(40)
    employeeLastName: string;
    
    @ApiProperty({ type: String, description: "Employee phone number", example: "4424456478", required: true, maxLength: 15, format: "phone" })
    @IsString()
    @MaxLength(15)
    employeePhoneNumber: string;
    
    @ApiProperty({ type: String, description: "Employee email", example: "jperez@gmail.com", required: true, format: "email" })
    @IsString()
    @IsEmail()
    employeeEmail: string;
    
    @ApiPropertyOptional({ type: Location, description: "Employee location" })
    @IsOptional()
    @IsObject()
    location: Location;
}   
