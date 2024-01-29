import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/common/decorators';
import { TenancyService } from './tenancy.service';

@Controller('tenancy')
export class TenancyController {
  constructor(private _tenancyService: TenancyService) {
  }
  @Get('runMigration')
  @Public()
  runMigration() {
    return this._tenancyService.runSchemaMigration();
  }
  @Public()
  @Get('revert')
  revert() {
    return this._tenancyService.revert();
  }
}
