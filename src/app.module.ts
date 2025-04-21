import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirQualityModule } from './modules/air-quality/air-quality.module';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { dbService } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available
    }),
    AirQualityModule,
    MikroOrmModule.forRoot(dbService.getConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
