import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PUBLIC_ROUTE } from './auth.constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { jwtConfig } from 'configs';
import { IJwtUserPayload } from '@common/interfaces';
import { UserService } from '@modules/user';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from '@databases/mysql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private userService: UserService,
  ) {
    console.log('AuthGuard constructor called');
    if (!reflector) {
      throw new Error('[AuthGuard]: constructor - no reflector');
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (!this.reflector) {
      throw new Error('[AuthGuard]: canActivate - no reflector');
    }

    const isPublicRoute = this.reflector.getAllAndOverride<boolean>(PUBLIC_ROUTE, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublicRoute) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractTokenFromHeader(request);

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<IJwtUserPayload>(accessToken, {
        secret: jwtConfig.secret,
      });

      let userEntity = await this.userService.findOneByUsername(payload.username);

      userEntity = plainToInstance(UserEntity, userEntity);
      // console.log('[auth.gaurd] payload: %o', payload);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = userEntity;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(/\s+/) ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
