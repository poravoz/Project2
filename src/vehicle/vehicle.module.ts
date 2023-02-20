import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';

import { DriverService } from '../driver/driver.service';
import { DriverController } from '../driver/driver.controller'

@Module({
  controllers: [VehicleController, DriverController],
  providers: [VehicleService, DriverService]
})
export class VehicleModule {}
