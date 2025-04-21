import { Module } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { AirQualityController } from './air-quality.controller';
import { IQAirService } from './util/IQ-air.service';
import { HttpModule } from '@nestjs/axios';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AirQuality } from './entity/air-quality';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    HttpModule,
    MikroOrmModule.forFeature({
      entities: [AirQuality],
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [IQAirService, AirQualityService],
  controllers: [AirQualityController],
})
export class AirQualityModule {}
