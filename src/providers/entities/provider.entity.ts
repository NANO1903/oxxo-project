import { Product } from './../../products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    providerId: string;
    @Column( 'text' )
    providerName: string;
    @Column( {type: 'text'} )
    providerEmail: string;
    @Column( {type: 'text', nullable: true, } )
    providerPhoneNumber: string;
    @OneToMany( () => Product, (product) => product.provider )
    products: Product[];
}
