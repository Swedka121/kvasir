import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const logger = new Logger('ORM');

@Module({
  imports: [
    MikroOrmModule.forRoot({
      clientUrl: process.env.DB_URL,
      driver: PostgreSqlDriver,
      debug: true,
      entities: ['../dist/entities/**/*.js'],
      entitiesTs: ['./entities/**/*.ts'],
      logger: logger.log.bind(logger),
      metadataProvider: ReflectMetadataProvider,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
