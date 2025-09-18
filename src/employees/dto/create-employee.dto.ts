import { IsEmail, IsString, IsUUID, IsOptional, MaxLength } from 'class-validator';

export class CreateEmployeeDto {
    @IsString()
    @IsUUID("4")
    @IsOptional()
    id: string;

    @IsString()
    @MaxLength(40)
    name: string;

    @IsString()
    @MaxLength(40)
    lastName: string;

    @IsString()
    @MaxLength(15)
    phoneNumber: string;

    @IsString()
    @IsEmail()
    email: string;
}   
