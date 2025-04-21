import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom, Observable } from 'rxjs';
import { IQAirResponseDto } from '../dto/IQ-airlocation.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IQAirService {
  private readonly API_URL: string;
  private readonly API_KEY: string;

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.API_URL = this.configService.get<string>('API_URL');
    this.API_KEY = this.configService.get<string>('API_KEY');
  }

  async getAirQualityForCoordinates(data: {
    lat: number;
    lon: number;
  }): Promise<IQAirResponseDto> {
    try {
      const response: AxiosResponse<IQAirResponseDto> = await firstValueFrom(
        this.httpService.get(this.API_URL, {
          params: {
            key: this.API_KEY,
            ...data,
          },
        }),
      );
      return response.data;
    } catch (error) {
      console.error('IQAir API error (coordinates):', error.message);
      throw error;
    }
  }
}
