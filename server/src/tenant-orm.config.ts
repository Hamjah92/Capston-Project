import * as config from "./ormconfig";
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
// Check typeORM documentation for more information.
const tenantConfig = {
  schema: 'tenant_1',
  ...config,
  name: "tenant",
  migrations: [__dirname + '/migrations/app/*{.ts,.js}'],
  entities: [__dirname + '/app/**/entity/*.entity{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations/app',
    // entitiesDir: 'src/entities/tenanted',
  },
} as PostgresConnectionOptions
export = tenantConfig

