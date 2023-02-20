import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { DriverModule } from './driver/driver.module'
import { ResponseModule } from './response/response.module'

@Module({
  imports: [VehicleModule, DriverModule, ResponseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
