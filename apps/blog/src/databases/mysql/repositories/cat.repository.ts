import { Inject, Injectable, Scope } from '@nestjs/common';
import { Request } from 'express';
import { InjectKnex } from '@common/modules/knex';
import { BaseRepository } from '@common/base/base.repository';
import { REQUEST } from '@nestjs/core';
import { Knex } from 'knex';
import { CatEntity } from '@databases/mysql/entities';

@Injectable({ scope: Scope.REQUEST })
export class CatRepository extends BaseRepository<CatEntity> {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,

    @InjectKnex()
    private readonly knex: Knex,
  ) {
    super(request, knex, CatEntity);
  }
}
