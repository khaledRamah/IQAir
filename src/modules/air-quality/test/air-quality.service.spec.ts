import { Test, TestingModule } from '@nestjs/testing';
import { IQAirService } from '../util/IQ-air.service';
import { pollutionJson, successIQAirResponse } from './success.smaple';
import { IQAirResponseDto } from '../dto/IQ-airlocation.dto';
import { AirQualityService } from '../air-quality.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { AirQuality } from '../entity/air-quality';
import { failIQAirResponse } from './fail.smaple';
import { EntityRepository } from '@mikro-orm/core';

describe('IQAirService', () => {
  let utilService: IQAirService;
  let service: AirQualityService;
  let repo: EntityRepository<AirQuality>;

  beforeEach(async () => {
    const mockAirQualityRepo = {
      insert: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AirQualityService,
        {
          provide: IQAirService,
          useValue: {
            getAirQualityForCoordinates: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(AirQuality),
          useValue: mockAirQualityRepo,
        },
      ],
    }).compile();

    utilService = module.get<IQAirService>(IQAirService);
    service = module.get<AirQualityService>(AirQualityService);
    repo = module.get<EntityRepository<AirQuality>>(
      getRepositoryToken(AirQuality),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAirQuality', () => {
    it('should return data when IQ air success', async () => {
      const mockCoords = { lat: 48.8566, lon: 2.3522 };
      jest
        .spyOn(utilService, 'getAirQualityForCoordinates')
        .mockReturnValueOnce(
          Promise.resolve(successIQAirResponse as IQAirResponseDto),
        );

      const result = await service.getAirQuality(mockCoords);
      expect(result).toMatchObject(pollutionJson);
    });

    it('should return data when passed data is null (nearest city)', async () => {
      const mockCoords = null;
      jest
        .spyOn(utilService, 'getAirQualityForCoordinates')
        .mockReturnValueOnce(
          Promise.resolve(successIQAirResponse as IQAirResponseDto),
        );

      const result = await service.getAirQuality(mockCoords);
      expect(result).toMatchObject(pollutionJson);
    });

    it('should throw exception when the service does not return success status', async () => {
      const mockCoords = { lat: 48.8566, lon: 2.3522 };
      jest
        .spyOn(utilService, 'getAirQualityForCoordinates')
        .mockReturnValueOnce(
          Promise.resolve(failIQAirResponse as IQAirResponseDto),
        );

      await expect(service.getAirQuality(mockCoords)).rejects.toBe(
        failIQAirResponse.status,
      );
    });
  });

  describe('fetchParisAirQuality', () => {
    it('should save data when API call is successful', async () => {
      const mockData = {};
      jest
        .spyOn(utilService, 'getAirQualityForCoordinates')
        .mockResolvedValue(successIQAirResponse as IQAirResponseDto);

      const insertSpy = jest.spyOn(repo, 'insert');

      await service.fetchParisAirQuality();
      expect(insertSpy).toHaveBeenCalled();
    });

    it('should log error if API fails', async () => {
      jest
        .spyOn(utilService, 'getAirQualityForCoordinates')
        .mockResolvedValue(failIQAirResponse as IQAirResponseDto);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await service.fetchParisAirQuality();
      expect(consoleSpy).toHaveBeenCalledWith(
        `Failed to fetch air quality data - ${failIQAirResponse.status}`,
      );

      consoleSpy.mockRestore();
    });
  });

  describe('getMostPollutedDate', () => {
    it('should return the most polluted Paris record', async () => {
      const mockRecord = {
        city: 'Paris',
        aqius: 150,
        ts: new Date(),
      } as AirQuality;

      jest.spyOn(repo, 'findOne').mockResolvedValue(mockRecord);

      const result = await service.getMostPollutedDate();
      expect(result).toEqual(mockRecord);
    });

    it('should throw an error when no record is found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);

      await expect(service.getMostPollutedDate()).rejects.toThrow(
        'Failed to retrieve most polluted date',
      );
    });

    it('should throw an error when repository throws', async () => {
      jest.spyOn(repo, 'findOne').mockRejectedValueOnce(new Error('DB error'));

      await expect(service.getMostPollutedDate()).rejects.toThrow(
        'Failed to retrieve most polluted date',
      );
    });
  });
});
