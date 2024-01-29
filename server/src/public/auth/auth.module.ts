import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Tenant } from '../tenants/entity/tenant.entity';
import { AtJwt, RtJwt } from './strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TenantsService } from '../tenants/tenants.service';
import { UserService } from 'src/app/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant]), JwtModule.register({}), ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, AtJwt, RtJwt, TenantsService]

})
export class AuthModule { }
