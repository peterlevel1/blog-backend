import { BaseEntityMeta } from '@common/base/base-entity.decorator';
import { BaseEntity, BaseEntityKeys } from '@common/base/base.entity';
import { assign, pick, uniq } from 'lodash';

export const TagEntityKeys = Object.freeze(uniq(['name', ...BaseEntityKeys]));

@BaseEntityMeta({
  tableName: 'tag',
  keys: [...TagEntityKeys],
})
export class TagEntity extends BaseEntity {
  name: string;

  constructor(data?: Partial<TagEntity>) {
    super(data);
    assign(this, pick(data, TagEntityKeys));
  }
}
