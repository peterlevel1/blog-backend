import { isNumber, values } from 'lodash';
import { Request } from 'express';
import { Knex } from 'knex';
import { InternalServerErrorException } from '@nestjs/common';
import { IPaginationResult, IQueryOrderBy, IQueryPagination, IQueryWhere } from '@common/interfaces';

export class BaseRepository<E> {
  protected readonly baseRequest: Request;
  protected readonly baseKnex: Knex;
  protected readonly baseEntityClass: { new (...args: any[]): E };

  constructor(request: Request, knex: Knex, baseEntityClass: { new (...args: any[]): E }) {
    this.baseRequest = request;
    this.baseKnex = knex;
    this.baseEntityClass = baseEntityClass;
  }

  create(entity: E): Promise<E> {
    return this.runTransaction<E>(async (trx: Knex.Transaction) => {
      const [id] = await this.baseKnex(this.getTableName())
        .transacting(trx)
        .insert({
          ...entity,
          uid: this.getUserId(),
        });

      // 查询新创建的数据
      return await this.baseKnex(this.getTableName()).transacting(trx).where('id', id).first();
    });
  }

  async update(id: number, entity: E): Promise<E> {
    return this.runTransaction<E>(async (trx: Knex.Transaction) => {
      // 更新数据
      await this.baseKnex(this.getTableName())
        .transacting(trx)
        .where({
          id,
          uid: this.getUserId(),
        })
        .update(entity);

      return await this.baseKnex(this.getTableName()).transacting(trx).where('id', id).first();
    });
  }

  async findAll(
    where: IQueryWhere = [],
    orderBy: IQueryOrderBy = [],
    pagination: IQueryPagination = { pageSize: 10, pageNumber: 1 },
  ): Promise<IPaginationResult<E>> {
    let qb = this.baseKnex(this.getTableName()).select();

    where.forEach(([key, op, value]) => {
      qb = qb.where(key, op, value);
    });

    qb = qb
      .where({ uid: this.baseRequest.user.id })
      .orderBy(orderBy || [])
      .limit(pagination.pageSize)
      .offset(pagination.pageSize * (pagination.pageNumber - 1));

    const list = await qb;

    const count = await this.baseKnex(this.getTableName()).count('* as count').first();
    const total = Number(count?.count);

    return {
      ...pagination,
      total,
      list,
    };
  }

  async findOneById(id: number): Promise<E | null> {
    return await this.baseKnex(this.getTableName())
      .where({
        id,
        uid: this.getUserId(),
      })
      .first();
  }

  async remove(id: number): Promise<boolean> {
    const affectedRows = await this.baseKnex(this.getTableName())
      .where({
        id,
        uid: this.getUserId(),
      })
      .delete();

    if (isNumber(affectedRows) && affectedRows === 0) {
      throw new InternalServerErrorException(`failed to del the record: ${id}`);
    }

    return affectedRows > 0;
  }

  getTableName() {
    return this.baseEntityClass['meta'].tableName;
  }

  getUserId() {
    return this.baseRequest.user.id;
  }

  async runTransaction<T>(cb: (trx: Knex.Transaction) => Promise<T>) {
    let err: Error;
    let result: T;

    await this.baseKnex.transaction(async (trx) => {
      try {
        result = await cb(trx);

        await trx.commit();
      } catch (error) {
        await trx.rollback();

        err = error;
      }
    });

    if (err) {
      throw new InternalServerErrorException(err.message, err.stack);
    }

    return result;
  }
}
