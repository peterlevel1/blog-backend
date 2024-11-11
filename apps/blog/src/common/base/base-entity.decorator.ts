import { commonUtil } from '@common/utils';
import { cloneDeep } from 'lodash';

export interface IBaseEntityMeta {
  tableName: string;

  keys: string[];

  createDtoKeys?: string[];

  updateDtoKeys?: string[];
}

export function BaseEntityMeta(meta: IBaseEntityMeta) {
  return function (target: Function) {
    const clonedMeta = cloneDeep(meta);

    commonUtil.deepFreeze(clonedMeta);

    target['meta'] = clonedMeta;
  };
}
