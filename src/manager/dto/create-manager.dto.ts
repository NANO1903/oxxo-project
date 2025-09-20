import { IsEmail, IsNumber, IsString, IsUUID, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";

export class CreateManagerDto {
    @IsString()
    @IsUUID()
    managerId: string;
    @IsString()
    @MaxLength(80)
    managerNFullame: string
    @IsNumber()
    managerSalary: number;
    @IsString()
    @IsEmail()
    managerEmail: string;
    @IsString()
    @MaxLength(15)
    managerPhoneNumber: string;
}
