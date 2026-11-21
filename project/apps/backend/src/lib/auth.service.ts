// apps/backend/src/lib/auth.service.ts
import { Injectable } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { createAuth } from './auth';

@Injectable()
export class AuthService {
  readonly auth: ReturnType<typeof createAuth>;

  constructor(orm: MikroORM) {
    this.auth = createAuth(orm);
  }
}
