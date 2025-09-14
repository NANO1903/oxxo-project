import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
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
    if (!createProductDto.productId) createProductDto.productId = uuid(); //Assign unique ID
    this.products.push(createProductDto);
    return createProductDto;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.filter((product) => product.productId === id)[0];
    
    if(!product) throw new NotFoundException();
    
    return product;
  }
  
  findByProvider(providerId: string) {
    //This action returns all products by provider

    const productsByProvider = this.products.filter((product) => product.provider === providerId);

    if(productsByProvider.length === 0) throw new NotFoundException();

    return productsByProvider;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
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

    return productToUpdate;
  }

  remove(id: string) {
    const { productId } =  this.findOne(id);
    this.products = this.products.filter((product) => product.productId !== productId);
    return this.products;
  }
}
