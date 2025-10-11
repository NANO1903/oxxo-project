import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginUserDto{
    @ApiProperty({ default: "user@gmail.com", type: String, required: true, description: "User email", format: "email" })
    @IsString()
    @IsEmail()
    userEmail: string;
    
    @ApiProperty({ default: "password", type: String, required: true, description: "User password", format: "password" })
    @IsString()
    @MinLength(8)
    userPassword: string;
}