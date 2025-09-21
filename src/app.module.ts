import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { ProvidersModule } from './providers/providers.module';
import { ManagerModule } from './manager/manager.module';
import { LocationsModule } from './locations/locations.module';
import { RegionsModule } from './regions/regions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EmployeesModule, ProductsModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.host,
    port: process.env.port ? parseInt(process.env.port) : 5432,
    username: 'postgres',
    password: "NANO_fba$1903",
    database: process.env.name,
    entities: [],
    autoLoadEntities: true,
    synchronize: true,
  }), ProvidersModule, ManagerModule, LocationsModule, RegionsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}