import { Inject, Injectable, Scope } from '@nestjs/common';
import { Request } from 'express';
import { InjectKnex } from '@common/modules/knex';
import { BaseRepository } from '@common/base/base.repository';
import { REQUEST } from '@nestjs/core';
import { Knex } from 'knex';
import { UserEntity } from '@databases/mysql/entities';

@Injectable({ scope: Scope.REQUEST })
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,

    @InjectKnex()
    private readonly knex: Knex,
  ) {
    super(request, knex, UserEntity);
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    return this.knex(this.getTableName()).where('username', username).first();
  }
}
