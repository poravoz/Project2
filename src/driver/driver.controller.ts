import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseFilters } from '@nestjs/common';
import { Driver } from './dto/DriverDto';
import {DriverFilterFilter } from './filter/driver-filter/driver-filter.filter';
import { DriverService } from './driver.service';

@Controller('drivers')
@UseFilters(new DriverFilterFilter())
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get('driver')
  public findCar(): Driver[] {
    return this.driverService.getDriver();
  }

  @Get(':id')
  public findCarById(@Param('id', ParseIntPipe) id: number): Driver {
    return this.driverService.getDriverById(id);
  }

  @Post(':id')
  public createDriver(@Body() dto: Driver): Driver {
    return this.driverService.addDriver(dto.name, dto.number_phone);
  }

  @Delete('driver/:id')
  public deleteDriver(@Param('id', ParseIntPipe) id: number): void {
    this.driverService.removeDriver(id);
  }

  @Put(':id')
  public updateDriver(@Param('id') id: string, @Body() driver: Driver): Driver {
    const updatedDriver = this.driverService.updateDriver(id, driver);
    return updatedDriver;
  } 

}
