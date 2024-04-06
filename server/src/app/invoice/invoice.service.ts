import { Inject, Injectable } from '@nestjs/common';
import { InvoiceDetailsEntity } from './entity/InvoiceDetails.entity';
import { InvoiceEntity } from './entity/Invoice.entity';
import { ProductEntity } from '../product/entity/product.entity';
import { InvoiceDto } from './dto/invoice.dto';
import { Connection, In, QueryRunner, Repository } from 'typeorm';
import { MyTransaction } from 'src/common/decorators/Transaction.decorator';
import { NestCommonRes } from 'src/custom_typing/common/http';
import { CONNECTION } from 'src/public/tenancy/tenancy.provider';

@Injectable()
export class InvoiceService {
  private _invoiceRepository: Repository<InvoiceEntity>;
  private _productRepository: Repository<ProductEntity>;
  private _invoiceDetailsRepository: Repository<InvoiceDetailsEntity>;
  protected connection: Connection;

  private readonly _queryRunner: QueryRunner;

  constructor(@Inject(CONNECTION) connection: Connection) {
    this._queryRunner = connection.createQueryRunner();
    this._invoiceRepository = connection.getRepository(InvoiceEntity);
    this._productRepository = connection.getRepository(ProductEntity);
    this._invoiceDetailsRepository = connection.getRepository(InvoiceDetailsEntity);
  }

  private invoiceId(): string {
    return 'INV' + new Date().getTime();
  }
  private invoiceDetailId(): string {
    return 'INVD' + new Date().getTime();
  }

  @MyTransaction()
  async createInvoice(data: InvoiceDto): Promise<NestCommonRes> {
    // Create invoice record
    await this._saveInvoice(data)

    return { message: `invoice added Successfully`, type: 'success', status: true };

  }

  async getInvoiceById(id: string) {
    const invoice = await this._invoiceRepository.findOne({
      where: { invoiceId: id },
      select: [
        "id", "invoiceId", "customerId", "addressId", "dueDate", "invoiceDate",
        "status", "subTotal", "netTotal", "shippingCost",
        "totalDiscount", "totalTaxInAmount"
      ]
    });

    // Check if the invoice was found
    if (!invoice) {
      throw new Error(`invoice with ID ${id} not found`); // Or handle this case appropriately for your application
    }

    const invoiceDetails = await this._invoiceDetailsRepository.find({
      where: { invoiceId: invoice.id },
      select: [
        "productId", "productQuantity", "productPrice",
        "taxInPer", "productTotal"
      ]
    });
    const products = await this._productRepository.find()

    // Map the backend structure to the expected frontend structure
    const mappedInvoice = {
      ...invoice,
      totalDiscountInPer: invoice.totalDiscount, // Assuming totalDiscount is already a percentage
      // If totalDiscount needs to be calculated as a percentage of some other value, adjust accordingly
      invoiceDetails: invoiceDetails.map(detail => {
        const p = products.find(product => product.productId === detail.productId);

        return {
          ...detail,
          productId: p
        }
      }
      )
    };

    return mappedInvoice;
  }

  async getAll(): Promise<InvoiceEntity[]> {
    return this._invoiceRepository.find({
      select: ["id", "invoiceId", "netTotal", "invoiceDate", "dueDate"],
      order: { invoiceDate: "DESC" }
    });
  }

  @MyTransaction()
  async updateInvoice(invoiceId: string, updateData: InvoiceDto): Promise<NestCommonRes> {
    const invoice = await this._invoiceRepository.findOne({ where: { invoiceId } });
    if (!invoice) {
      throw new Error(`invoice with ID ${invoiceId} not found.`);
    }
    await this.deleteInvoiceById(invoice.id);
    await this._saveInvoice(updateData, invoiceId)
    // this.createinvoice(invoice.id)

    await this._invoiceRepository.save(invoice);
    return { message: `invoice Updated Successfully`, type: 'success', status: true };
  }

  @MyTransaction()
  async deleteInvoiceById(id: number): Promise<NestCommonRes> {
    // Fetch all related invoice details for all invoices to be deleted
    const invoiceDetails = await this._queryRunner.manager.find(InvoiceDetailsEntity, {
      where: { invoiceId: id },
    });
    console.log(id);

    console.log(invoiceDetails);


    for (const details of invoiceDetails) {
      await this._queryRunner.manager.decrement(ProductEntity, { productId: details.productId }, 'availableQuantity', details.productQuantity);
    }


    // Delete invoice details
    await this._queryRunner.manager.delete(InvoiceDetailsEntity, invoiceDetails);

    // Delete invoices
    const result = await this._queryRunner.manager.delete(InvoiceEntity, {
      id: id,
    });

    return { type: 'success', message: `${result.affected} invoices deleted`, status: true };
  }

  @MyTransaction()
  async deleteManyInvoices(invoice_ids: string[]): Promise<NestCommonRes> {
    // Fetch all related invoice details for all invoices to be deleted
    const invoiceDetails = await this._queryRunner.manager.find(InvoiceDetailsEntity, {
      where: { invoiceId: In(invoice_ids) },
    });



    // Adjust product quantities
    for (const details of invoiceDetails) {
      await this._queryRunner.manager.decrement(ProductEntity, { productId: details.productId }, 'availableQuantity', details.productQuantity);
    }

    // Delete invoice details
    await this._queryRunner.manager.delete(InvoiceDetailsEntity, {
      invoiceId: In(invoice_ids),
    });

    // Delete invoices
    const result = await this._queryRunner.manager.delete(InvoiceEntity, {
      id: In(invoice_ids),
    });

    return { type: 'success', message: `${result.affected} invoices deleted`, status: true };
  }


  private async _saveInvoice(data: InvoiceDto, invoiceId = null) {
    invoiceId = invoiceId ?? this.invoiceId();
    // Create invoice record
    const invoice = new InvoiceEntity();
    invoice.invoiceId = invoiceId; // Generate or use as per your requirement
    invoice.invoiceDate = new Date(data.invoiceDate);
    invoice.dueDate = new Date(data.dueDate);
    invoice.totalDiscount = data.totalDiscountInPer;
    invoice.totalTaxInAmount = data.totalTaxInAmount;
    invoice.shippingCost = data.shippingCost;
    invoice.subTotal = data.subTotal;
    invoice.status = data.status;
    invoice.netTotal = data.netTotal;
    invoice.customerId = data.customerId;
    invoice.addressId = data.addressId ?? null;

    const res = await this._queryRunner.manager.save(InvoiceEntity, invoice);

    let i = 0;
    for (const detail of data.invoiceDetails) {

      const product = await this._queryRunner.manager.findOne(ProductEntity, { where: { productId: detail.productId.productId } });
      if (!product) {
        throw new Error(`Product with ID ${detail.productId} not found.`);
      }
      product.availableQuantity = product.availableQuantity + detail.productQuantity;
      await this._queryRunner.manager.update(ProductEntity, product.id, product);

      // invoice Details
      const invoiceDetail = new InvoiceDetailsEntity();
      invoiceDetail.invoiceDetailsId = this.invoiceDetailId() + `${i}`;
      invoiceDetail.productId = detail.productId.productId;
      invoiceDetail.invoiceId = res.id;
      invoiceDetail.productPrice = detail.productPrice;
      invoiceDetail.productQuantity = detail.productQuantity;
      invoiceDetail.taxInPer = detail.taxInPer;
      invoiceDetail.productTotal = detail.productTotal;

      await this._queryRunner.manager.save(InvoiceDetailsEntity, invoiceDetail)
      i++;
    };
  }
}
