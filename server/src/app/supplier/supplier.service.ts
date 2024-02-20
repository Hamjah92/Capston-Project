import { Inject, Injectable } from '@nestjs/common';
import { Supplier } from './entity/supplier.entity';
import { Connection, In, QueryRunner, Repository } from 'typeorm';
import { CONNECTION } from 'src/public/tenancy/tenancy.provider';
import { SupplierDto } from './dto/supplier.dto';
import { MyTransaction } from 'src/common/decorators/Transaction.decorator';

@Injectable()
export class SupplierService {
  private readonly _supplierRepository: Repository<Supplier>;
  protected readonly connection: Connection;
  private readonly _queryRunner: QueryRunner;
  private readonly test: string;

  constructor(@Inject(CONNECTION) connection: Connection) {
    this.connection = connection;
    this._queryRunner = connection.createQueryRunner();
    this._supplierRepository = connection.getRepository(Supplier);
  }

  private SupperId(): string {
    return 'Sup' + new Date().getTime();
  }

  @MyTransaction()
  async deleteManySupplier(supplier_ids: string[]) {

    const result = await this._queryRunner.manager.delete(Supplier, {
      supplierId: In(supplier_ids)
    });

    return { type: 'success', message: `${result.affected} supplier deleted` }
  }

  async getAll() {
    return await this._supplierRepository.find({
      select: [
        'supplierId',
        'supplierName',
        'supplierEmail',
        'supplierPhone',
      ],
      order: { createdAt: "DESC" }
    });
  }

  async getById(supplierId: string) {
    const supplier = await this._findSupplier(supplierId)
    return { supplier}
  }

  public async create(supplierDto: SupplierDto) {
    const supplier = new Supplier();
    const { supplierName } = await this._saveSupplier(supplier, supplierDto)
    return { message: `${supplierName} add As supplier Successfully`, type: 'success', status: true };
  }

  async editSupplier(updatedSupplier: SupplierDto, supplierId: string) {
    const supplier = await this._findSupplier(supplierId);
    await this._saveSupplier(supplier, updatedSupplier, supplierId);
    return { message: `supplier Updated Successfully`, type: 'success', status: true };
  }

  async deleteSupplierById(supplierId: string) {

    const result = await this._queryRunner.manager.delete(Supplier, {
      supplierId,
    });

    return { type: 'success', message: `${result.affected} supplier deleted` }
  }


  private async _saveSupplier(supplier: Supplier, supplierDto: SupplierDto, supplierId: string = null) {
    supplier.supplierId = supplierId ?? this.SupperId();
    supplier.supplierName = supplierDto.supplierName;
    supplier.supplierPhone = supplierDto.supplierPhone;
    supplier.supplierEmail = supplierDto.supplierEmail;
    supplier.supplierGST = supplierDto.supplierGST;

    if (!supplierId) {
      await this._queryRunner.manager.save(Supplier, supplier);
    } else {
      await this._queryRunner.manager.update(Supplier, { supplierId: supplierId }, supplier);
    }
    return supplier;
  }

  private async _findSupplier(supplierId: string, select?: (keyof Supplier)[]) {
    if (!select) {
      select = ["supplierName", "supplierEmail", "supplierPhone","supplierGST"]
    }
    return await this._supplierRepository.findOneOrFail({
      where: { supplierId: supplierId },
      select: select
    })

  }
}

