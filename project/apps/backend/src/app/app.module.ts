import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { mikroOrmConfig } from '../mikro-orm.config';
import { AuthService } from '../lib/auth.service';
import { AuthWrapperModule } from '../auth/auth.module';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig), AuthWrapperModule.register()],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}