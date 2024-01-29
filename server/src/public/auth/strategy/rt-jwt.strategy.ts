import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';

export type JwtRefreshPayLoad = {
  sub: number;
  email: string;
  refreshToken: string;
}
@Injectable()
export class RtJwt extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly config: ConfigService) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        let data = request?.cookies.refreshToken;
        // console.log(request?.cookies);
        
        if (!data) {
          return null;
        }
        return data
      }]),
      secretOrKey: config.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true
    });
  }

  validate(req: Request, payload: JwtRefreshPayLoad) {
    const refreshToken = req.cookies.refreshToken;
    return {
      ...payload,
      refreshToken
    };
  }
}