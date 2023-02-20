import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseFilters } from '@nestjs/common';
import { Response } from './dto/responseDto';
import {ResponseFilterFilter } from './filter/driver-filter/response-filter.filter';
import { ResponseService } from './response.service';

@Controller('response')
@UseFilters(new ResponseFilterFilter())
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Get()
  public findResponse(): Response[] {
    return this.responseService.getResponse();
  }

  @Get(':id')
  public findResponseById(@Param('id', ParseIntPipe) id: number): Response {
    return this.responseService.getResponseById(id);
  }

  @Post(':id')
  public createResponse(@Body() dto: Response): Response {
    return this.responseService.addResponse(dto.name, dto.response);
  }

  @Delete(':id')
  public deleteResponse(@Param('id', ParseIntPipe) id: number): void {
    this.responseService.removeResponse(id);
  }

  @Put(':id')
  public updateResponse(@Param('id') id: string, @Body() driver: Response): Response {
    const updatedResponse = this.responseService.updateResponse(id, driver);
    return updatedResponse;
  } 

}
