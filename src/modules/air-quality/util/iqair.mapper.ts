import { IQAirResponseDto } from '../dto/IQ-airlocation.dto';
import { AirQuality } from '../entity/air-quality';

export function mapToPollutionDto(response: IQAirResponseDto) {
  const pollution = response.data.current.pollution;

  return {
    pollution: {
      ts: new Date(pollution.ts),
      aqius: pollution.aqius,
      mainus: pollution.mainus,
      aqicn: pollution.aqicn,
      maincn: pollution.maincn,
    },
  };
}

export function mapToAirQualityEntity(data: IQAirResponseDto): AirQuality {
  const pollution = data.data.current.pollution;
  const airQuality = new AirQuality();

  // Map properties from the API response to the AirQuality entity
  airQuality.city = data.data.city;
  airQuality.state = data.data.state;
  airQuality.country = data.data.country;
  airQuality.aqius = pollution.aqius;
  airQuality.mainus = pollution.mainus;
  airQuality.aqicn = pollution.aqicn;
  airQuality.maincn = pollution.maincn;
  airQuality.ts = new Date(pollution.ts); // Convert timestamp to Date
  airQuality.createdAt = new Date(); // Convert timestamp to Date

  return airQuality;
}
