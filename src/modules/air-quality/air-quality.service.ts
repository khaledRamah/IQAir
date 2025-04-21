import { Injectable } from '@nestjs/common';
import { IQAirService } from './util/IQ-air.service';
import { IQAirStatus } from './dto/IQ-airlocation.dto';
import { mapToAirQualityEntity, mapToPollutionDto } from './util/iqair.mapper';
import { EntityRepository } from '@mikro-orm/core';
import { AirQuality } from './entity/air-quality';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AirQualityService {
  constructor(
    private iqAirService: IQAirService,
    @InjectRepository(AirQuality)
    private readonly airQualityRepo: EntityRepository<AirQuality>,
  ) {}

  async getAirQuality(data: { lat: number; lon: number }) {
    const AirQualityResult =
      await this.iqAirService.getAirQualityForCoordinates(data);
    if (AirQualityResult.status == IQAirStatus.SUCCESS) {
      return mapToPollutionDto(AirQualityResult);
    } else {
      throw AirQualityResult.status;
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async fetchParisAirQuality() {
    try {
      const airQualityData =
        await this.iqAirService.getAirQualityForCoordinates({
          lat: 48.856613,
          lon: 2.352222,
        });
      if (airQualityData.status === 'success') {
        await this.airQualityRepo.insert(mapToAirQualityEntity(airQualityData));
        console.log('Air quality data saved at:', new Date());
      } else {
        console.error(
          `Failed to fetch air quality data - ${airQualityData?.status}`,
        );
      }
    } catch (error) {
      console.error('Failed to fetch air quality data', error);
    }
  }

  async getMostPollutedDate(): Promise<AirQuality | null> {
    try {
      const airQualityRow = await this.airQualityRepo.findOne(
        { city: 'Paris' },
        {
          orderBy: { aqius: 'desc' },
        },
      );

      if (!airQualityRow) {
        throw new Error('Failed to retrieve most polluted date');
      }
      return airQualityRow;
    } catch (error) {
      throw new Error('Failed to retrieve most polluted date');
    }
  }
}
