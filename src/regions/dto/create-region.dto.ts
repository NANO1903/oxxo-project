import { IsString, IsInt, IsArray, MaxLength } from 'class-validator';
import { Region } from '../entities/region.entity';

export class CreateRegionDto {
    @IsInt()
    regionId: number;
    @IsString()
    @MaxLength(100)
    regionName: string;
    @IsArray()
    regionStates: string[];
}
