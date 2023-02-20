import { Injectable } from '@nestjs/common';
import { Driver } from './dto/DriverDto';
import {DriverExeption } from './exeption/driver.exeption/driver.exeption';

@Injectable()
export class DriverService {
  private driver: Driver[] = [];

  public getDriver(): Driver[] {
    return this.driver;
  }

  public getDriverById(id: number): Driver {
    const driver: Driver = this.driver.find(driver => driver.id === id);

    if(!driver) {
      throw new DriverExeption('Note is empty!');
    }

    return driver;
  }

  public addDriver(name: string, number_phone: string): Driver {
    if(!name || name.length === 0) {
      throw new DriverExeption('Note is empty!');
    }

    if(!number_phone || number_phone.length === 0) {
      throw new DriverExeption('Note is empty!');
    }

    const newDto = {id: this.generateId(), name, number_phone}
    this.driver.push(newDto)
    return newDto;
  }

  public updateDriver(id: string, newDriver: Driver): Driver {
    this.driver.forEach((driver, index) => {
      if(driver.id === +id) {
        let updatedDriver = {
          ...this.driver[index],
          ...newDriver
        }
        this.driver[index] = updatedDriver;
      }
    });
   let updatedDriver = this.driver.find((driver) => driver.id === +id);
   updatedDriver.name = newDriver.name;
   updatedDriver.number_phone = newDriver.number_phone;
   return updatedDriver = this.driver.find((driver) => driver.id === +id);
  }

  public removeDriver(id: number): void {
    const index: number = this.driver.findIndex(driver => driver.id === id);
    if(index === -1) {
      throw new DriverExeption('No note found');
    }

    this.driver.splice(index, 1);
  }

  private generateId(): number {
    const currentSize = this.driver.length;
    if(!currentSize) {
      return 0;
    }
    return this.driver[currentSize - 1].id + 1;
  }
}


