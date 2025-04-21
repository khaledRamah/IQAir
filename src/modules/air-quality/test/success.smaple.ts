export const successIQAirResponse = {
  status: 'success',
  data: {
    city: 'Paris',
    state: 'Île-de-France',
    country: 'France',
    location: {
      type: 'Point',
      coordinates: [2.3522, 48.8566], // [longitude, latitude]
    },
    current: {
      pollution: {
        ts: '2025-04-20T10:00:00.000Z',
        aqius: 85,
        mainus: 'p2',
        aqicn: 70,
        maincn: 'p1',
      },
      weather: {
        ts: '2025-04-20T10:00:00.000Z',
        tp: 18,
        pr: 1015,
        hu: 60,
        ws: 3.5,
        wd: 270,
        ic: '01d',
      },
    },
  },
};

export const pollutionJson = {
  pollution: {
    ts: new Date('2025-04-20T10:00:00.000Z'),
    aqius: 85,
    mainus: 'p2',
    aqicn: 70,
    maincn: 'p1',
  },
};

export const controllerPollutionJson = {
  result: {
    pollution: {
      ts: new Date('2025-04-20T10:00:00.000Z'),
      aqius: 85,
      mainus: 'p2',
      aqicn: 70,
      maincn: 'p1',
    },
  },
};

export const controllerMostPollutedDate = {
  datetime: new Date('2025-04-20T10:00:00.000Z'),
  aqius: 85,
  aqicn: 70,
};

export const entityAirQuality = {
  id: 1,
  city: 'Paris',
  state: 'Ile-de-France',
  country: 'France',
  aqius: 85,
  mainus: 'pm2.5',
  aqicn: 70,
  maincn: 'pm10',
  ts: new Date('2025-04-20T10:00:00.000Z'),
  createdAt: new Date('2025-04-20T10:05:00.000Z'),
};
