import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { ManagerModule } from 'src/manager/manager.module';
import { Manager } from 'src/manager/entities/manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Manager]), ManagerModule],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
