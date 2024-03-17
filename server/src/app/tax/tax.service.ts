import { Inject, Injectable } from '@nestjs/common';
import { Connection, In, QueryRunner, Repository } from 'typeorm';
import { Tax } from './entity/tax.entity';
import { CONNECTION } from 'src/public/tenancy/tenancy.provider';
import { TaxDto } from './dto/tax.dto';
import { NestCommonRes } from 'src/custom_typing/common/http';

@Injectable()
export class TaxService {
  private readonly _taxRepository: Repository<Tax>;
  protected readonly connection: Connection;
  private readonly _queryRunner: QueryRunner;

  constructor(@Inject(CONNECTION) connection: Connection) {
    this.connection = connection;
    this._queryRunner = connection.createQueryRunner();
    this._taxRepository = connection.getRepository(Tax);
  }

  async getAll() {
    return await this._taxRepository.find({
      select: [
        'id',
        'taxName',
        'taxRate',
        'taxType',
      ]
    });
  }

  async getById(id: number) {
    const tax = await this._findTax(id)
    return { tax }
  }


  async createTax(taxDTo: TaxDto): Promise<NestCommonRes> {
    try {

      const tax = new Tax();
      await this._saveTax(tax, taxDTo);
      return { message: "Tax slab added Successfully", status: true, type: "success" }
    } catch (error) {
      return { message: error.massage, status: false, type: "error" }
    }
  }

  async editTax(updatedTax: TaxDto, id: number) {
    const tax = await this._findTax(id);
    await this._saveTax(tax, updatedTax);
    return { message: `tax Updated Successfully`, type: 'success', status: true };
  }


  async deleteTaxById(id: number) {
    console.log(id);
    
    const result = await this._queryRunner.manager.delete(Tax, {
      id,
    });

    return { type: 'success', message: `${result.affected} tax deleted` }
  }

  async deleteManyTax(tax_ids: number[]) {

    const result = await this._queryRunner.manager.delete(Tax, {
      id: In(tax_ids)
    });

    return { type: 'success', message: `${result.affected} tax deleted` }
  }

  private async _saveTax(tax: Tax, taxDto: TaxDto, id: number | null = null) {
    tax.taxName = taxDto.taxName;
    tax.taxRate = taxDto.taxRate;
    tax.taxType = taxDto.taxType;

    if (!!id) {
      await this._queryRunner.manager.update(Tax, { id }, tax);
    } else {
      await this._queryRunner.manager.save(Tax, tax);
    }

    return tax;
  }

  private async _findTax(id: number, select?: (keyof Tax)[]) {
    if (!select) {
      select = ["taxName", "taxRate", "taxType", "id"]
    }
    return await this._taxRepository.findOneOrFail({
      where: { id },
      select: select
    })

  }

}
