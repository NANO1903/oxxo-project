import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  private products: CreateProductDto[] = [{
    productId: uuid(),
    productName: 'Sabritas Normal 60g',
    price: 29,
    countSeal: 3,
    provider: uuid()
  },
  {
    productId: uuid(),
    productName: 'Coca-Cola 600ml',
    price: 40,
    countSeal: 2,
    provider: uuid()
  },
  {
    productId: uuid(),
    productName: 'Agua Ciel 1L',
    price: 15,
    countSeal: 0,
    provider: uuid()
  }];

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto);
    return product;
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    const product = this.productRepository.findOneBy( {productId: id} );
    
    if(!product) throw new NotFoundException();
    
    return product; 
  }
  
  findByProvider(providerId: string) {
    //This action returns all products by provider

    const productsByProvider = this.products.filter((product) => product.provider === providerId);

    if(productsByProvider.length === 0) throw new NotFoundException();

    return productsByProvider;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...updateProductDto
    });

    if (!productToUpdate) throw new NotFoundException();
    
    this.productRepository.save(productToUpdate);

    return productToUpdate;    
    
    /*
    let productToUpdate = this.findOne(id); //Buscar el producto a actualizar
    productToUpdate = {  //Actualizar el producto
      ... productToUpdate, //Copiar los datos del producto encontrado
      ... updateProductDto //Sobreescribir con los datos del DTO
    }

    this.products = this.products.map((product) => { //Actualizar el array de productos
      if (product.productId === id) {   //Coindicidencia de ID
        product = productToUpdate;  //Actualizar el producto
      }
      return product;
    });

    return productToUpdate;*/
  }

  remove(id: string) {
    this.findOne(id);
    this.productRepository.delete( {productId: id} );
    //return this.productRepository.find();
    return { message: `Product with id ${id} deleted` };
  }
}
