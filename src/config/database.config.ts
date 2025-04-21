import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { AirQuality } from '../modules/air-quality/entity/air-quality';
import * as dotenv from 'dotenv';
import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
export class DBService {
  constructor() {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = dotenv.config().parsed[key] || '';
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getConfig(): MikroOrmModuleSyncOptions {
    return defineConfig({
      entities: [AirQuality],
      dbName: this.getValue('POSTGRES_DATABASE'),
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      debug: false,
      user: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      allowGlobalContext: true,
      discovery: { warnWhenNoEntities: true },
      extensions: [Migrator],
    });
  }
}

const dbService = new DBService().ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export default dbService.getConfig();

export { dbService };
