import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MaxLength, IsObject } from 'class-validator';

export class LocationEmployeeDto {
    @ApiProperty()
    locationId: number;

    @ApiPropertyOptional()
    locationName: string;
    
    @ApiPropertyOptional()
    locationLatLng: number[];

    @ApiPropertyOptional()
    locationAddress: string;
}

export class CreateEmployeeDto{
    @ApiProperty()
    @IsString()
    @MaxLength(40)
    employeeName: string;
    
    @ApiProperty()
    @IsString()
    @MaxLength(40)
    employeeLastName: string;
    
    @ApiProperty()
    @IsString()
    @MaxLength(15)
    employeePhoneNumber: string;
    
    @ApiProperty()
    @IsString()
    @IsEmail()
    employeeEmail: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    location: LocationEmployeeDto;
}   
