import { Migration } from '@mikro-orm/migrations';

export class Migration20261120175407 extends Migration {

  override name = 'Migration20261120175407';

  override up(): void | Promise<void> {
    this.addSql(`create table "user" ("id" varchar(255) not null, "name" varchar(255) not null, "email" varchar(255) not null, "email_verified" boolean not null default false, "image" text null, "created_at" timestamptz not null, "updated_at" timestamptz not null, primary key ("id"));`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);

    this.addSql(`create table "session" ("id" varchar(255) not null, "expires_at" timestamptz not null, "token" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "ip_address" text null, "user_agent" text null, "user_id_id" varchar(255) not null, primary key ("id"));`);
    this.addSql(`alter table "session" add constraint "session_token_unique" unique ("token");`);
    this.addSql(`create index "session_user_id_id_index" on "session" ("user_id_id");`);

    this.addSql(`create table "account" ("id" varchar(255) not null, "account_id" text not null, "provider_id" text not null, "user_id_id" varchar(255) not null, "access_token" text null, "refresh_token" text null, "id_token" text null, "access_token_expires_at" timestamptz null, "refresh_token_expires_at" timestamptz null, "scope" text null, "password" text null, "created_at" timestamptz not null, "updated_at" timestamptz not null, primary key ("id"));`);
    this.addSql(`create index "account_user_id_id_index" on "account" ("user_id_id");`);

    this.addSql(`create table "verification" ("id" varchar(255) not null, "identifier" varchar(255) not null, "value" text not null, "expires_at" timestamptz not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, primary key ("id"));`);
    this.addSql(`create index "verification_identifier_index" on "verification" ("identifier");`);

    this.addSql(`alter table "session" add constraint "session_user_id_id_foreign" foreign key ("user_id_id") references "user" ("id") on delete cascade;`);

    this.addSql(`alter table "account" add constraint "account_user_id_id_foreign" foreign key ("user_id_id") references "user" ("id") on delete cascade;`);
  }

}
