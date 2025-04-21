import { Migration } from '@mikro-orm/migrations';

export class Migration20250421115939 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "air_quality" ("id" serial primary key, "city" varchar(255) not null, "state" varchar(255) not null, "country" varchar(255) not null, "aqius" int not null, "mainus" varchar(255) not null, "aqicn" int not null, "maincn" varchar(255) not null, "ts" timestamptz not null, "created_at" timestamptz not null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "air_quality" cascade;`);
  }

}
