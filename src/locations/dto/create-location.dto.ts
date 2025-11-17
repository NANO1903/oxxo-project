import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty, IsString, MaxLength, IsOptional, IsObject, IsUUID } from 'class-validator';
import { Region } from 'src/regions/entities/region.entity';

export class CreateLocationDto {
    @ApiProperty({ type: String, description: "Location name", example: "OXXO Centro Sur", required: true, maxLength: 35, format: "text" })
    @IsString()
    @MaxLength(35)
    locationName: string;
    
    @ApiProperty({ type: String, description: "Location address", example: "Prol. Bernardo Quintana 7001, Centro Sur, 76090 Santiago de Querétaro, Querétaro", required: true, maxLength: 120, format: "text" })
    @IsString()
    @MaxLength(120)
    locationAddress: string;
    
    @ApiProperty({ type: Array, description: "Location latitude and longitude", example: [20.56894, -19.56515], required: true, format: "array", minItems: 2, maxItems: 2 })
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[];
    
    @ApiPropertyOptional({ type: Region, description: "Location region" })
    @IsObject()
    @IsOptional()
    region: Region;
    
    @ApiPropertyOptional({ type: String, description: "Manager UUID" })
    @IsUUID()
    @IsOptional()
    manager: string;
}