import { Exclude } from 'class-transformer';
import { assign, pick } from 'lodash';

export const BaseDateEntityKeys = Object.freeze(['createdAt', 'updatedAt', 'deletedAt']);

export const BaseEntityKeys = Object.freeze(['id', 'status', ...BaseDateEntityKeys]);

export class BaseDateEntity {
  createdAt: Date;

  updatedAt: Date;

  @Exclude()
  deletedAt?: Date | null;

  constructor(data?: Partial<BaseDateEntity>) {
    assign(this, pick(data, BaseDateEntityKeys));
  }
}

export class BaseEntity extends BaseDateEntity {
  id: number;

  status: number;

  constructor(data?: Partial<BaseEntity>) {
    super(data);

    assign(this, pick(data, BaseEntityKeys));
  }
}
