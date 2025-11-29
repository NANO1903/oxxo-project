import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Provider } from "src/providers/entities/provider.entity";

export class CreateProductDto{
    @ApiProperty({ type: String, description: "Product ID", required: false, format: "uuid" })
    @IsString()
    @IsUUID("4")
    @IsOptional()
    productId: string;
    
    @ApiProperty({ type: String, description: "Product name", required: true, format: "text", maxLength: 40 })
    @IsString()
    @MaxLength(40)
    productName: string;
    
    @ApiProperty({ type: Number, description: "Product price", required: true, format: "number", minimum: 1 })
    @IsNumber()
    price: number;
    
    @ApiProperty({ type: Number, description: "Number of health seals", required: true, format: "number", minimum: 0 })
    @IsInt()
    countSeal: number;
    
    @ApiProperty({ type: Provider, description: "Provider of this product", required: true})
    @IsString()
    provider: Provider | string;
}
