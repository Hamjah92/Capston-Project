import { Global, Module } from '@nestjs/common';
import { TenancyController } from './tenancy.controller';
import { connectionFactory } from './tenancy.provider';
import { TenancyService } from './tenancy.service';

@Global()
@Module({
  controllers: [TenancyController],
  providers: [connectionFactory, TenancyService],
  exports:[connectionFactory]
})
export class TenancyModule {
  
}
