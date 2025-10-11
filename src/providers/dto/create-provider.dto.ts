import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength } from "class-validator";

export class CreateProviderDto {
    @ApiProperty({ type: String, description: "Provider name", required: true, format: "text", maxLength: 100 })
    @IsString()
    @MaxLength(100)
    providerName: string;
    
    @ApiProperty({ type: String, description: "Provider email", required: true, format: "email" })
    @IsEmail()
    @IsString()
    providerEmail: string;
    
    @ApiProperty({ type: String, description: "Provider phone number", required: true, format: "phone", maxLength: 15 })
    @IsString()
    @MaxLength(15)
    providerPhoneNumber: string;
}
