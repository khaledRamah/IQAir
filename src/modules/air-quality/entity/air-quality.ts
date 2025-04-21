import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class AirQuality {
  @PrimaryKey()
  id!: number;

  @Property()
  city: string;

  @Property()
  state: string;

  @Property()
  country: string;

  @Property()
  aqius: number;

  @Property()
  mainus: string;

  @Property()
  aqicn: number;

  @Property()
  maincn: string;

  @Property()
  ts: Date;

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();
}
