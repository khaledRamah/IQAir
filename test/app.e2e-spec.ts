import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AirQualityController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Make sure AppModule connects to test DB
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/air-quality/nearest (GET)', () => {
    it('should return air quality for valid coordinates', async () => {
      const response = await request(app.getHttpServer())
        .get('/air-quality/nearest?lat=48.8566&lon=2.3522')
        .expect(200);

      expect(response.body).toHaveProperty('result');
      expect(response.body.result).toHaveProperty('pollution');
      expect(response.body.result.pollution).toHaveProperty('aqius');
    });

    it('should return 400 for invalid lat/lon', async () => {
      const response = await request(app.getHttpServer())
        .get('/air-quality/nearest?lat=abc&lon=xyz')
        .expect(400);

      expect(response.body.message).toBe('Failed to retrieve air quality data');
    });
  });

  describe('/air-quality/most-polluted-date (GET)', () => {
    it('should return most polluted date (if data exists)', async () => {
      const res = await request(app.getHttpServer())
        .get('/air-quality/most-polluted-date')
        .expect(200);

      // If no data exists, the endpoint returns a fallback message
      if (res.body.message) {
        expect(res.body.message).toBe('No pollution data found for location.');
      } else {
        expect(res.body).toHaveProperty('datetime');
        expect(res.body).toHaveProperty('aqius');
        expect(res.body).toHaveProperty('aqicn');
      }
    });
  });
});
