import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user';
import { bcryptUtil } from '@common/utils';
import { AuthLoginDto } from './auth.dto';
import { messages } from '@common/messages';
import { IJwtUserPayload } from '@common/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(authLoginDto: AuthLoginDto): Promise<{ accessToken: string }> {
    const { username, password } = authLoginDto;

    // TODO: username, email, phone
    const user = await this.userService.findOneByUsername(username);

    if (!user) {
      throw new BadRequestException(messages.exception.auth.wrongUsername);
    }

    const matched = await bcryptUtil.matchPassword(password, user.password);
    if (!matched) {
      throw new UnauthorizedException();
    }

    const payload: IJwtUserPayload = {
      sub: user.id,
      iss: process.env.JWT_ISS,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}
