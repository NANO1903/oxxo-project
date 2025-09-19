import { IsArray, ArrayNotEmpty, IsString, MaxLength } from 'class-validator';
import { Location } from 'src/locations/entities/location.entity';

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
}

