import { Injectable } from '@nestjs/common';
import { getConnection, getManager } from 'typeorm';
import { getTenantConnection } from './tenancy.utils';

@Injectable()
export class TenancyService {
  constructor() { }

  async runSchemaMigration() {
    try {
      await getConnection().runMigrations();
      const schemas = await getManager().query(`select schema_name as name from information_schema.schemata;`);

      for (let i = 0; i < schemas.length; i += 1) {
        const { name: schema } = schemas[i];
        if (schema.startsWith('tenant_')) {
          const tenantId = schema.replace('tenant_', '');
          const connection = await getTenantConnection(tenantId);
          await connection.runMigrations()
          await connection.close();
        }
      }
      return { status: true, message: "Migration Run successfully" }
    } catch (error: any) {
      return { status: false, message: error.message }
    }
  }

  async revert() {
    await getConnection().undoLastMigration()
    const schemas = await getManager().query(`select schema_name as name from information_schema.schemata;`);
    for (let i = 0; i < schemas.length; i += 1) {
      const { name: schema } = schemas[i];
      if (schema.startsWith('tenant_')) {
        const tenantId = schema.replace('tenant_', '');
        const connection = await getTenantConnection(tenantId);
        await connection.undoLastMigration()
        await connection.close();
      }
    }
  }
}
