import { BaseEntityMeta } from '@common/base/base-entity.decorator';
import { BaseEntity, BaseEntityKeys } from '@common/base/base.entity';
import { assign, pick, uniq } from 'lodash';

export const PostEntityKeys = Object.freeze(uniq(['title', 'content', 'slug', 'cover', ...BaseEntityKeys]));

@BaseEntityMeta({
  tableName: 'post',
  keys: [...PostEntityKeys],
})
export class PostEntity extends BaseEntity {
  title: string;

  content: string;

  slug: string;

  cover: string;

  uid: number;

  constructor(data?: Partial<PostEntity>) {
    super(data);
    assign(this, pick(data, PostEntityKeys));
  }
}
