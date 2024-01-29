import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { UserDto } from 'src/app/user/dto/user.dto';
import { AuthService } from './auth.service';
import { GetUser, Public } from './common/decorators';
import { RtGuard } from './common/guards';
import { LoginDto } from './dto';
import { JwtRefreshPayLoad } from './strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private configService: ConfigService) { }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('/register')
  register(@Body() user: UserDto) {
    return this.authService.register(user);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('/login')
  async login(@Body() credentials: LoginDto, @Res({ passthrough: true }) response: Response) {
    const token = await this.authService.login(credentials);
    if (token instanceof Error) return { status: false, message: token.message };
    response.cookie('refreshToken', token.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'strict',
      secure: true
    });
    
     return { status: true, "accessToken": token.accessToken }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/logout')
  logout(@GetUser('sub') userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refresh(
    @GetUser() user: JwtRefreshPayLoad,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = await this.authService.refresh(user.sub, user.refreshToken);
    response.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'strict',
      secure: true
    });
    return {"accessToken": data.accessToken };
  }
}
