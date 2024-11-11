import { RouteInfo } from '@nestjs/common/interfaces';

export interface IMiddlewareConfig {
  exclude?: (string | RouteInfo)[];
  routes: (string | RouteInfo)[];
  middleware: any;
  init?: () => void;
}

export interface IResponse<T = any> {
  code: number;
  data?: T;
  method?: string;
  url?: string;
  timestamp?: string;
  message?: string;
}

export interface IJwtUserPayload {
  sub: number;
  username: string;
  iss: string;
  // 签发时间: 10位时间戳
  iat?: number;
  // 失效时间: 10位时间戳
  exp?: number;
}

export interface IBasicUserInfo {
  id: number;
  username: string;
}

export interface IQueryDto {
  // where
  w?: string;
  // orderBy
  o?: string;
  // pageSize
  s: string;
  // pageNumber
  n: string;
}

export interface IQueryOrderBy extends Array<{ column: string; order: 'desc' | 'asc' }> {}

export interface IQueryWhere extends Array<[string, '=' | '!=' | '>' | '<', string]> {}

export interface IQueryPagination {
  pageSize: number;
  pageNumber: number;
}

export interface IPaginationResult<T> extends IQueryPagination {
  total: number;
  list: T[];
}
