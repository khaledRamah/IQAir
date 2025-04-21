import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { PollutionDto } from './dto/pollution.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Air Quality')
@Controller('air-quality')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Get('/nearest')
  @ApiOperation({ summary: 'Get air quality based on nearest city' })
  @ApiResponse({
    status: 200,
    description: 'Air quality data retrieved successfully',
    type: PollutionDto,
  })
  @ApiQuery({ name: 'lat', required: false, type: String })
  @ApiResponse({ status: 400, description: 'Bad request or API error' })
  async getAirQuality(@Query('lat') lat: string, @Query('lon') lon: string) {
    try {
      // Convert lat and lon to numbers
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lon);

      let data = null;
      if (isNaN(latitude) || isNaN(longitude)) {
        throw new Error('Lat and Lon should have valid values');
      } else {
        data = {
          lat: latitude,
          lon: longitude,
        };
      }

      // Call service to get air quality for the provided coordinates
      const result = await this.airQualityService.getAirQuality(data);

      return { result };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to retrieve air quality data',
          reason: error.message || error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('most-polluted-date')
  @ApiOperation({ summary: 'Get the most polluted date and time for location' })
  @ApiResponse({
    status: 200,
    description:
      'The most polluted date and time for location was fetched successfully.',
    schema: {
      example: {
        datetime: '2025-04-18T11:00:00.000Z',
        aqius: 72,
        aqicn: 29,
      },
    },
  })
  async getMostPollutedDate() {
    try {
      const mostPollutedRecord =
        await this.airQualityService.getMostPollutedDate();
      if (!mostPollutedRecord) {
        throw new HttpException(
          {
            message: 'No pollution data found for location.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        datetime: mostPollutedRecord.ts,
        aqius: mostPollutedRecord.aqius,
        aqicn: mostPollutedRecord.aqicn,
      };
    } catch (error) {
      // Catch any error and throw a custom response
      throw new HttpException(
        {
          message: 'Failed to retrieve air quality data',
          reason: error.message || error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
