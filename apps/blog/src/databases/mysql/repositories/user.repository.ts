import { Injectable } from '@nestjs/common';
import { InjectKnex } from '@common/modules/knex';
import { Knex } from 'knex';
import { UserEntity } from '@databases/mysql/entities';

@Injectable()
export class UserRepository {
  constructor(
    @InjectKnex()
    private readonly knex: Knex,
  ) {}

  async findOneByUsername(username: string): Promise<UserEntity> {
    return this.knex('user').where('username', username).first();
  }
}
