import { UserEntity } from '@databases/mysql';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetCurrentUser = createParamDecorator<UserEntity>((data: unknown, ctx: ExecutionContext): UserEntity => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request.user!;
});

export const UserId = createParamDecorator<UserEntity>((data: unknown, ctx: ExecutionContext): number => {
  const request = ctx.switchToHttp().getRequest();
  return request.user.id;
});
