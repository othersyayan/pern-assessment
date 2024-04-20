import { Migration } from '@mikro-orm/migrations';

export class Migration20240420031403 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("uuid" uuid not null, "username" varchar(255) not null, "password" varchar(255) not null, constraint "user_pkey" primary key ("uuid"));');
  }

}
