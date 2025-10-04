import { IsArray, ArrayNotEmpty, IsString, MaxLength, IsOptional, IsObject } from 'class-validator';
import { Location } from 'src/locations/entities/location.entity';
import { Region } from 'src/regions/entities/region.entity';

export class CreateLocationDto {
    @IsString()
    @MaxLength(35)
    locationName: string;
    @IsString()
    @MaxLength(120)
    locationAddress: string;
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[];
    @IsObject()
    @IsOptional()
    region: Region;
}

