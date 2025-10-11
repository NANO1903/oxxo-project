import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateManagerDto {
    @ApiProperty({ type: String, description: "Manager name", required: true, format: "text", maxLength: 80 })
    @IsString()
    @MaxLength(80)
    managerNFullame: string;
    
    @ApiProperty({ type: Number, description: "Manager salary", required: true, format: "number", minimum: 0 })
    @IsNumber()
    managerSalary: number;
    
    @ApiProperty({ type: String, description: "Manager email", required: true, format: "email" })
    @IsString()
    @IsEmail()
    managerEmail: string;
    
    @ApiProperty({ type: String, description: "Manager phone number", required: true, format: "phone", maxLength: 15 })
    @IsString()
    @MaxLength(15)
    managerPhoneNumber: string;
}
