import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseFilters } from '@nestjs/common';
import { Vehicle } from './dto/VehicleDto';
import { VehicleFilterFilter } from './filter/vehicle-filter/vehicle-filter.filter';
import { VehicleService } from './vehicle.service';

import { DriverService } from '../driver/driver.service';

@Controller('vehicle')
@UseFilters(new VehicleFilterFilter())
export class VehicleController {
    constructor(
      private readonly vehicleService: VehicleService, 
      private readonly driverService: DriverService,
      ) {}

  @Get('car')
  public findCar(): Vehicle[] {
    return this.vehicleService.getVehicle();
  }

  @Get(':id')
  public findCarById(@Param('id', ParseIntPipe) id: number): Vehicle {
    return this.vehicleService.getVehicleById(id);
  }

  @Post()
  public createCar(@Body() dto: Vehicle): Vehicle {
    return this.vehicleService.addVehicle(dto.content, dto.status, dto.number_agency, dto.number_car);
  }

  @Delete(':vehicleId')
  public deleteCar(@Param('vehicleId', ParseIntPipe) vehicleId: number): void {
    this.vehicleService.removeVehicle(vehicleId);
  }

  @Delete('car/:id/driver/:driverId')
  public deleteAllById(@Param('id', ParseIntPipe) id: number, @Param('driverId', ParseIntPipe) driverId: number): void {
    this.vehicleService.removeVehicle(id);
    this.driverService.removeDriver(driverId);
  }

  @Put(':id')
  public updateCar(@Param('id') id: string, @Body() vehicle: Vehicle): Vehicle {
    const updatedVehicle = this.vehicleService.updateVehicle(id, vehicle);
    return updatedVehicle;  
  } 
}