import { Injectable } from '@nestjs/common';
import { Response } from './dto/responseDto';
import {ResponseExeption } from './exeption/driver.exeption/response.exeption';

@Injectable()
export class ResponseService {
  private responses: Response[] = [];

  public getResponse(): Response[] {
    return this.responses;
  }

  public getResponseById(id: number): Response {
    const response: Response = this.responses.find(response => response.id === id);

    if(!response) {
      throw new ResponseExeption('Note is empty!');
    }

    return response;
  }

  public addResponse(name: string, response: string): Response {
    if(!name || name.length === 0) {
      throw new ResponseExeption('Note is empty!');
    }

    if(!response || response.length === 0) {
      throw new ResponseExeption('Note is empty!');
    }

    const newDto = {id: this.generateId(), name, response}
    this.responses.push(newDto)
    return newDto;
  }

  public updateResponse(id: string, newResponse: Response): Response {
    this.responses.forEach((response, index) => {
      if(response.id === +id) {
        let updatedResponse = {
          ...this.responses[index],
          ...newResponse
        }
        this.responses[index] = updatedResponse;
      }
    });
   let updatedResponse = this.responses.find((response) => response.id === +id);
   updatedResponse.name = newResponse.name;
   updatedResponse.response = newResponse.response;
   return updatedResponse = this.responses.find((response) => response.id === +id);
  }

  public removeResponse(id: number): void {
    const index: number = this.responses.findIndex(response => response.id === id);
    if(index === -1) {
      throw new ResponseExeption('No note found');
    }

    this.responses.splice(index, 1);
  }

  private generateId(): number {
    const currentSize = this.responses.length;
    if(!currentSize) {
      return 0;
    }
    return this.responses[currentSize - 1].id + 1;
  }
}


