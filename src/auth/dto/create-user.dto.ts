import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ default: "user@gmail.com", type: String, required: true, description: "User email", format: "email" })
    @IsEmail()
    userEmail: string;
    
    @ApiProperty({ default: "password123", type: String, required: true, description: "User password", format: "password" })
    @IsString()
    @MinLength(8)
    userPassword: string;

    @ApiProperty({ default: "Employee", type: String, required: false, description: "User role", enum: ["Admin", "Employee", "Manager"] })
    @IsOptional()
    @IsIn(["Admin", "Employee", "Manager"])
    userRoles: string[];
}
