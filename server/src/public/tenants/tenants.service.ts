
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { getTenantConnection } from '../tenancy/tenancy.utils';
import { Tenant } from './entity/tenant.entity';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
  ) { }

  async create(tenant: Tenant): Promise<Tenant> {

    tenant = await this.tenantsRepository.save(tenant);
    const schemaName = `tenant_${tenant.id}`;
    await getManager().query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
    const connection = await getTenantConnection(`${tenant.id}`);
    await connection.runMigrations()
    await connection.close();
    return tenant
  }
  async findAll(): Promise<Tenant[]> {
    return this.tenantsRepository.find();
  }
}
