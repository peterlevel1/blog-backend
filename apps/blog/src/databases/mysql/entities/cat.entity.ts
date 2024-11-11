import { BaseEntityMeta } from '@common/base/base-entity.decorator';
import { BaseEntity, BaseEntityKeys } from '@common/base/base.entity';
import { assign, pick } from 'lodash';

export const CatEntityKeys = Object.freeze(['name', ...BaseEntityKeys]);

@BaseEntityMeta({
  tableName: 'cat',
  keys: [...CatEntityKeys],
})
export class CatEntity extends BaseEntity {
  name: string;

  constructor(data?: Partial<CatEntity>) {
    super(data);
    assign(this, pick(data, CatEntityKeys));
  }
}
