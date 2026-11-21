import { DynamicModule, Module } from '@nestjs/common';
import { MikroORM, RequestContext } from '@mikro-orm/core';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { createAuth } from '../lib/auth';

@Module({})
export class AuthWrapperModule {
  static register(): DynamicModule {
    return {
      module: AuthWrapperModule,
      imports: [
        AuthModule.forRootAsync({
          inject: [MikroORM],
          useFactory: (orm: MikroORM) => {
            return {
              auth: createAuth(orm),
              middleware: (req, res, next) => {
                RequestContext.create(orm.em, next);
              },
            };
          },
        }),
      ],
      exports: [AuthModule],
    };
  }
}