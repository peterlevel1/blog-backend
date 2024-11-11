import { BaseEntityMeta } from '@common/base/base-entity.decorator';
import { BaseDateEntity, BaseDateEntityKeys } from '@common/base/base.entity';
import { assign, pick } from 'lodash';

export const ImageEntityKeys = Object.freeze(['path', 'name', 'type', 'size', ...BaseDateEntityKeys]);

@BaseEntityMeta({
  tableName: 'image',
  keys: [...ImageEntityKeys],
})
export class ImageEntity extends BaseDateEntity {
  path: string;

  name: string;

  type: string;

  size: number;

  constructor(data?: Partial<ImageEntity>) {
    super(data);
    assign(this, pick(data, ImageEntityKeys));
  }
}
