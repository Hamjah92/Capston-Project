import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { UserModule } from './app/user/user.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import * as config from './ormconfig';
import { AuthModule } from './public/auth/auth.module';
import { AtGuard } from './public/auth/common/guards';
import { TenancyModule } from './public/tenancy/tenancy.module';
import { TenantsModule } from './public/tenants/tenants.module';
import { CustomerModule } from './app/customer/customer.module';
import { SupplierModule } from './app/supplier/supplier.module';
import { TaxModule } from './app/tax/tax.module';
import { ProductModule } from './app/product/product.module';
import { PurchaseModule } from './app/purchase/purchase.module';
import { InvoiceModule } from './app/invoice/invoice.module';
import { ReportModule } from './app/report/report.module';


@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      async useFactory() {
        return {
          ...config as PostgresConnectionOptions,
          autoLoadEntities: true,
        };
      },
    }),
    UserModule,
    TenantsModule,
    CustomerModule,
    TenancyModule,
    AuthModule,
    SupplierModule,
    TaxModule,
    ProductModule,
    PurchaseModule,
    InvoiceModule,
    ReportModule,
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: AtGuard,
  }],

})

export class AppModule {
  
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes("*");
  }
}


