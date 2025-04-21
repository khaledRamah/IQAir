export class IQAirLocationDto {
  type: string;
  coordinates: number[]; // [longitude, latitude]
}

export class IQAirPollutionDto {
  ts: string;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
}

export class IQAirWeatherDto {
  ts: string;
  tp: number;
  pr: number;
  hu: number;
  ws: number;
  wd: number;
  ic: string;
}

export class IQAirCurrentDto {
  pollution: IQAirPollutionDto;
  weather: IQAirWeatherDto;
}

export class IQAirDataDto {
  city: string;
  state: string;
  country: string;
  location: IQAirLocationDto;
  current: IQAirCurrentDto;
}

export class IQAirResponseDto {
  status: IQAirStatus;
  data: IQAirDataDto;
}

export enum IQAirStatus {
  SUCCESS = 'success',
  CALL_LIMIT_REACHED = 'call_limit_reached',
  API_KEY_EXPIRED = 'api_key_expired',
  INCORRECT_API_KEY = 'incorrect_api_key',
  IP_LOCATION_FAILED = 'ip_location_failed',
  NO_NEAREST_STATION = 'no_nearest_station',
  FEATURE_NOT_AVAILABLE = 'feature_not_available',
  TOO_MANY_REQUESTS = 'too_many_requests',
}
