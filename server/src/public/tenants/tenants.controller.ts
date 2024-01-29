import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from '../auth/common/decorators';
import { CreateTenantDto } from './dto/createTenant.dto';
import { TenantsService } from './tenants.service';

@Controller('tenants')
export class TenantsController {
  constructor(private tenantsService : TenantsService) {
  }

  @Get('getAll')
  getTenants() {
    return this.tenantsService.findAll();
  }

  // @Post('create')
  // @Public()
  // createTenant(@Body() createTenantDto: CreateTenantDto) {
  //   return this.tenantsService.create(createTenantDto);
  // }
}
