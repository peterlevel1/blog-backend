import { BaseEntityMeta } from '@common/base/base-entity.decorator';
import { BaseEntity, BaseEntityKeys } from '@common/base/base.entity';
import { Exclude } from 'class-transformer';
import { assign, pick, uniq } from 'lodash';

export const UserEntityKeys = Object.freeze(uniq(['username', 'email', 'phone', 'password', ...BaseEntityKeys]));

@BaseEntityMeta({
  tableName: 'user',
  keys: [...UserEntityKeys],
})
export class UserEntity extends BaseEntity {
  username: string;

  email: string;

  phone: string;

  @Exclude()
  password: string;

  constructor(data?: Partial<UserEntity>) {
    super(data);
    assign(this, pick(data, UserEntityKeys));
  }
}
