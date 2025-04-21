import { Test, TestingModule } from '@nestjs/testing';
import { AirQualityController } from '../air-quality.controller';
import { AirQualityService } from '../air-quality.service';
import {
  controllerMostPollutedDate,
  controllerPollutionJson,
  entityAirQuality,
  pollutionJson,
} from './success.smaple';
import { IQAirStatus } from '../dto/IQ-airlocation.dto';
import { rejects } from 'assert';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AirQuality } from '../entity/air-quality';

describe('AirQualityController', () => {
  let controller: AirQualityController;
  let service: AirQualityService;
  const mockAirQualityService = {
    getAirQuality: jest.fn(),
    getMostPollutedDate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirQualityController],
      providers: [
        {
          provide: AirQualityService,
          useValue: mockAirQualityService,
        },
      ],
    }).compile();

    controller = module.get<AirQualityController>(AirQualityController);
    service = module.get<AirQualityService>(AirQualityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /nearest', () => {
    it('should return data for valid lat/lon', async () => {
      jest.spyOn(service, 'getAirQuality').mockResolvedValue(pollutionJson);

      const result = await controller.getAirQuality('48.856613', '2.352222');
      expect(result).toEqual(controllerPollutionJson);
    });

    it('should return data for null/invalid lat/lon with nearest location ', async () => {
      jest
        .spyOn(service, 'getAirQuality')
        .mockRejectedValue(new Error(IQAirStatus.NO_NEAREST_STATION));
      await expect(controller.getAirQuality(null, '13')).rejects.toThrow(
        new HttpException(
          {
            message: 'Failed to retrieve air quality data',
          },
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should throw if service throws an error', async () => {
      jest
        .spyOn(service, 'getAirQuality')
        .mockRejectedValue(new Error(IQAirStatus.NO_NEAREST_STATION));

      await expect(controller.getAirQuality('13', '13')).rejects.toThrow(
        new HttpException(
          {
            message: 'Failed to retrieve air quality data',
          },
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('GET /most-polluted-date', () => {
    it('should return data is in db', async () => {
      jest
        .spyOn(service, 'getMostPollutedDate')
        .mockResolvedValue(entityAirQuality as AirQuality);

      const result = await controller.getMostPollutedDate();
      expect(result).toEqual(controllerMostPollutedDate);
    });

    it('should throw if service throws an error', async () => {
      jest
        .spyOn(service, 'getMostPollutedDate')
        .mockRejectedValue(new Error('Failed to retrieve most polluted date'));

      await expect(controller.getMostPollutedDate()).rejects.toThrow(
        new HttpException(
          {
            message: 'Failed to retrieve air quality data',
          },
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });
});
