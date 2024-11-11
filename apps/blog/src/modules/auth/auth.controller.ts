import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthLoginDto } from './auth.dto';
import { PublicRoute } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.signIn(authLoginDto);
  }

  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Get('logout')
  logout() {
    return 200;
  }
}
