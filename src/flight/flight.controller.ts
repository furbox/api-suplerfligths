import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';
import { PassengerService } from '../passenger/passenger.service';
import { HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('flight')
@Controller('api/v1/flight')
export class FlightController {
  constructor(
    private readonly flightService: FlightService,
    private readonly passengerService: PassengerService,
  ) {}
  @Post()
  @ApiOperation({ summary: 'Create a flight' })
  create(@Body() flightDTO: FlightDTO) {
    return this.flightService.create(flightDTO);
  }
  @Get()
  @ApiOperation({ summary: 'Get all flights' })
  findAll() {
    return this.flightService.findAll();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get flight by id' })
  findOne(@Param('id') id: string) {
    return this.flightService.findOne(id);
  }
  @Put(':id')
  @ApiOperation({ summary: 'Update flight by id' })
  update(@Param('id') id: string, @Body() flightDTO: FlightDTO) {
    return this.flightService.update(id, flightDTO);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete flight by id' })
  delete(@Param('id') id: string) {
    return this.flightService.delete(id);
  }
  @Post(':flightId/passenger/:passengerId')
  @ApiOperation({ summary: 'Add passengers a flight by id' })
  async addPassanger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this.passengerService.findOne(passengerId);
    if (!passenger)
      throw new HttpException('Passenger not Found', HttpStatus.NOT_FOUND);
    return this.flightService.addPassanger(flightId, passengerId);
  }
}
