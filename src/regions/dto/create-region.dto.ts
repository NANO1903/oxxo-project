import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsArray, MaxLength } from 'class-validator';

export class CreateRegionDto {
    @ApiProperty({ type: Number, description: "Region ID", example: 1, required: false})
    @IsInt()
    regionId: number;
    
    @ApiProperty({ type: String, description: "Region name", example: "Bajío", required: true, maxLength: 100 })
    @IsString()
    @MaxLength(100)
    regionName: string;
    
    @ApiProperty({ type: Array, description: "Region States", example: ["Querétaro", "CDMX", "Guanajuato"], required: true })
    @IsArray()
    regionStates: string[];
}
