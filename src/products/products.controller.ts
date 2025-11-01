import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiAuth()
@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
  
  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  
  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.productsService.findOne(id);
  }
  
  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Get('by-provider/:providerId')
  findByProvider(@Param('providerId', new ParseUUIDPipe({version: '4'})) providerId: string) {
    return this.productsService.findByProvider(providerId);
  }
  
  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }
  
  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.productsService.remove(id);
  }
}
