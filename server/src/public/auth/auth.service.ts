import { ForbiddenException, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Tenant } from '../tenants/entity/tenant.entity';
import * as argon2 from 'argon2';
import { CommonsRespopnse, Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { TenantsService } from '../tenants/tenants.service';
import { ConfigService } from '@nestjs/config';
import { getTenantConnection } from '../tenancy/tenancy.utils';
import { User } from 'src/app/user/entity/user.entity';
import { UserDto } from 'src/app/user/dto/user.dto';
import { LoginDto } from './dto';


@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    @InjectRepository(Tenant) private readonly tenantRepository: Repository<Tenant>,
    private readonly _tenantService: TenantsService,
    private readonly config: ConfigService,
    private jwtService: JwtService) { }

  generateUserId() {
    return `UID${new Date().toISOString()}${Math.floor(Math.random() * 99)}`
  }
  async register(dto: UserDto): Promise<Tokens> {
    try {
      const hash = await argon2.hash(dto.password);
      const tenant = new Tenant();
      tenant.firstName = dto.firstName;
      tenant.lastName = dto.lastName;
      tenant.email = dto.email;
      tenant.password = hash;

      const res = await this._tenantService.create(tenant);
      const token = await this.getToken(res.id, res.email, res.firstName, res.lastName);

      const a = await this.setUser(dto, res.id.toString())
      await this.updateRt(res.id, token.refreshToken);
      return token;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async login(credentials: LoginDto): Promise<CommonsRespopnse> {
    try {
      const tenant = await this.tenantRepository.findOne({
        where: { email: credentials.email },
        select: ['password', 'id', 'email', 'firstName', "lastName"]
      })

      if (!tenant) { throw new ForbiddenException('Invalid credentials') }
      const isValid = await argon2.verify(tenant.password, credentials.password);

      if (!isValid) { throw new ForbiddenException('Invalid credentials') }

      const token = await this.getToken(tenant.id, tenant.email, tenant.firstName, tenant.lastName);
      await this.updateRt(tenant.id, token.refreshToken);

      console.log(token);

      return { data: token, status: true, message: "Login Succes" };
    } catch (error) {

      return { message: error.message, status: false, data: null };
    }
  }

  async logout(userId: number) {
    try {
      const tenant = await this.tenantRepository.findOne({
        where: {
          id: userId,
          hashRt: Not(IsNull())
        }
      });

      if (!tenant) {
        throw new ForbiddenException('Invalid Action');
      }
      tenant.hashRt = null;
      await this.tenantRepository.save(tenant);
      return { status: true }
    } catch (error) {
      return error
    }
  }
  async refresh(userId: number, refreshToken: string) {
    const tenant = await this.tenantRepository.findOne({
      where: {
        id: userId,
        hashRt: Not(IsNull()),
      },
      select: ['id', 'hashRt']
    })
    
    if (!tenant) throw new ForbiddenException('Invalid Action');

    const isValid = await argon2.verify(tenant.hashRt, refreshToken);

    if (!isValid) throw new ForbiddenException('Invalid Action');

    console.log(isValid);


    const token = await this.getToken(tenant.id, tenant.email, tenant.firstName, tenant.lastName);
    await this.updateRt(tenant.id, token.refreshToken);


    return token;
  }

  private async getToken(userId: number, email: string, firstName: string, lastName: string) {
    const [at, rt]: string[] = await Promise.all([
      this.jwtService.sign({
        sub: userId,
        email: email,
        firstName: firstName,
        lastName: lastName

      }, { secret: this.config.get("JWT_ACCESS_SECRET"), expiresIn: '1h' }),
      this.jwtService.sign({
        sub: userId,
        email: email,
      }, { secret: this.config.get("JWT_REFRESH_SECRET"), expiresIn: '8h' })
    ])

    return {
      accessToken: at,
      refreshToken: rt
    }
  }

  private async updateRt(id: number, refreshToken: string) {
    const hash = await argon2.hash(refreshToken);

    const tenant = await this.tenantRepository.findOne({
      where: { id: id },
    })
    tenant.hashRt = hash;

    await this.tenantRepository.save(tenant);
  }

  async setUser(userDto: UserDto, tenantId: string) {
    const connection = await getTenantConnection(tenantId);
    const queryRunner = connection.createQueryRunner()
    await queryRunner.connect()
    const user = new User()
    user.userId = this.generateUserId();
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.email = userDto.email;
    user.tenantId = tenantId;
    await queryRunner.manager.save(User, user)
    await queryRunner.release()
  }
}
