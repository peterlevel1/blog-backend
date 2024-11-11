import { IPaginationResult, IQueryDto, IQueryOrderBy, IQueryPagination, IQueryWhere } from '@common/interfaces';
import { isArray, keys } from 'lodash';

export class BaseService<E, R> {
  protected entityClass: { new (...args: any[]): E };
  protected baseRepo: R;

  constructor(entityClass: { new (...args: any[]): E }, repo: R) {
    this.baseRepo = repo;
    this.entityClass = entityClass;
  }

  create(createDto: any): Promise<E> {
    const createDto1 = keys(createDto)
      .filter((key) => {
        const createDtoKeys = this.entityClass['meta']!.createDtoKeys;

        if (isArray(createDtoKeys)) {
          return createDtoKeys.includes(key);
        }

        const keys = this.entityClass['meta']!.keys;

        if (isArray(keys)) {
          return keys.includes(key);
        }

        return false;
      })
      .filter(Boolean)
      .reduce((m, k) => ({ ...m, [k]: createDto[k] }), {});

    const entity = new this.entityClass(createDto1);

    return this.baseRepo['create'](entity);
  }

  update(id: number, updateDto: any): Promise<E> {
    const updateDto1 = keys(updateDto)
      .filter((key) => {
        const updateDtoKeys = this.entityClass['meta']!.updateDtoKeys;

        if (isArray(updateDtoKeys)) {
          return updateDtoKeys.includes(key);
        }

        const keys = this.entityClass['meta'].keys;

        if (isArray(keys)) {
          return keys.includes(key);
        }

        return false;
      })
      .filter(Boolean)
      .reduce((m, k) => ({ ...m, [k]: updateDto[k] }), {});

    const entity = new this.entityClass(updateDto1);

    return this.baseRepo['update'](id, entity);
  }

  async findAll(query: IQueryDto): Promise<IPaginationResult<E>> {
    const where = !query.w
      ? []
      : decodeURIComponent(query.w)
          .split(',')
          .map((pair) => {
            // TODO: 验证 key 在 postEntity 的列表中
            const regex = /[<>=!]+/;
            const opMatched = pair.match(regex);

            const op = !opMatched ? null : opMatched[0];
            const [key, value] = pair.split(regex);

            if (!['=', '!=', '>', '<'].includes(op)) {
              return null;
            }

            return [key, op, value];
          })
          .filter(Boolean);

    const orderBy = !query.o
      ? [{ column: 'createdAt', order: 'desc' }]
      : decodeURIComponent(query.o)
          .split(',')
          .map((pair) => {
            const [column, order] = pair.split('');

            if (!['asc', 'desc'].includes(order)) {
              return null;
            }

            if (!column) {
              return null;
            }

            return { column, order };
          })
          .filter(Boolean);

    const pagination: IQueryPagination = {
      pageSize: Number(query.s || 10),
      pageNumber: Number(query.n || 1),
    };

    if (pagination.pageSize < 1) {
      pagination.pageSize = 10;
    }

    if (pagination.pageNumber < 1) {
      pagination.pageNumber = 1;
    }

    const result = await this.baseRepo['findAll'](where as IQueryWhere, orderBy as IQueryOrderBy, pagination);

    // if (isArray(result.list)) {
    //   result.list = result.list.map((item: E) => plainToInstance(this.entityClass as any, item));
    // }

    return result;
  }

  findOne(id: number): Promise<E> {
    return this.baseRepo['findOneById'](id);
  }

  remove(id: number): Promise<boolean> {
    return this.baseRepo['remove'](id);
  }
}
