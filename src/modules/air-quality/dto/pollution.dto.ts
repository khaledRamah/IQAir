import { ApiProperty } from '@nestjs/swagger';

export class PollutionDto {
  @ApiProperty({ type: String, description: 'Timestamp of pollution data' })
  ts: Date;

  @ApiProperty({ type: Number, description: 'US AQI value' })
  aqius: number;

  @ApiProperty({ type: String, description: 'Main pollutant for US AQI' })
  mainus: string;

  @ApiProperty({ type: Number, description: 'CN AQI value' })
  aqicn: number;

  @ApiProperty({ type: String, description: 'Main pollutant for CN AQI' })
  maincn: string;
}
