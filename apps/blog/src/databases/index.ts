import {
  CatRepository,
  ImageRepository,
  KnexDbModule,
  MysqlDbModule,
  PostRepository,
  TagRepository,
  UserRepository,
} from './mysql';

export const databaseModules = [MysqlDbModule, KnexDbModule];

export const repositoryProviders = [UserRepository, PostRepository, CatRepository, TagRepository, ImageRepository];
