import { Injectable, Inject } from '@nestjs/common';
import { Repository, Connection, QueryRunner, In } from 'typeorm';
import { CONNECTION } from 'src/public/tenancy/tenancy.provider';
import { ProductEntity } from '../product/entity/product.entity';
import { PurchaseEntity } from './entity/purchase.entity';
import { MyTransaction } from 'src/common/decorators/Transaction.decorator';
import { PurchaseDetailsEntity } from './entity/purchaseDetails.entity';
import { CreatePurchaseDto } from './dto/purchase.dto';
import { NestCommonRes } from 'src/custom_typing/common/http';

@Injectable()
export class PurchaseService {
  private _purchaseRepository: Repository<PurchaseEntity>;
  private _productRepository: Repository<ProductEntity>;
  private _purchaseDetailsRepository: Repository<PurchaseDetailsEntity>;
  protected connection: Connection;

  private readonly _queryRunner: QueryRunner;

  constructor(@Inject(CONNECTION) connection: Connection) {
    this._queryRunner = connection.createQueryRunner();
    this._purchaseRepository = connection.getRepository(PurchaseEntity);
    this._productRepository = connection.getRepository(ProductEntity);
    this._purchaseDetailsRepository = connection.getRepository(PurchaseDetailsEntity);
  }

  private purchaseId(): string {
    return 'pid' + new Date().getTime();
  }
  private purchaseDetailId(): string {
    return 'pDid' + new Date().getTime();
  }

  @MyTransaction()
  async createPurchase(data: CreatePurchaseDto): Promise<NestCommonRes> {
    // Create purchase record
    await this._savePurchase(data)

    return { message: `Purchase added Successfully`, type: 'success', status: true };

  }

  async getPurchaseById(id: string) {
    const purchase = await this._purchaseRepository.findOne({
      where: { purchaseId: id },
      select: [
        "id", "purchaseId", "supplierId", "dueDate", "purchaseDate",
        "status", "subTotal", "netTotal", "shippingCost",
        "totalDiscount", "totalTaxInAmount"
      ]
    });

    // Check if the purchase was found
    if (!purchase) {
      throw new Error(`Purchase with ID ${id} not found`); // Or handle this case appropriately for your application
    }

    const purchaseDetails = await this._purchaseDetailsRepository.find({
      where: { purchaseId: purchase.id },
      select: [
        "productId", "productQuantity", "productPrice",
        "taxInPer", "productTotal"
      ]
    });
    const products = await this._productRepository.find()

    // Map the backend structure to the expected frontend structure
    const mappedPurchase = {
      ...purchase,
      totalDiscountInPer: purchase.totalDiscount, // Assuming totalDiscount is already a percentage
      // If totalDiscount needs to be calculated as a percentage of some other value, adjust accordingly
      purchaseDetails: purchaseDetails.map(detail => {
        const p = products.find(product => product.productId === detail.productId);

        return {
          ...detail,
          productId: p
        }
      }
      )
    };
    console.log(mappedPurchase);
    

    return mappedPurchase;
  }

  async getAll(): Promise<PurchaseEntity[]> {
    return this._purchaseRepository.find({
      select: ["id", "purchaseId", "netTotal", "purchaseDate", "dueDate"],
      order: { purchaseDate: "DESC" }
    });
  }

  @MyTransaction()
  async updatePurchase(purchaseId: string, updateData: CreatePurchaseDto): Promise<NestCommonRes> {
    const purchase = await this._purchaseRepository.findOne({ where: { purchaseId } });
    if (!purchase) {
      throw new Error(`Purchase with ID ${purchaseId} not found.`);
    }
    await this.deletePurchaseById(purchase.id);
    await this._savePurchase(updateData, purchaseId)
    // this.createPurchase(purchase.id)

    await this._purchaseRepository.save(purchase);
    return { message: `Purchase Updated Successfully`, type: 'success', status: true };
  }

  @MyTransaction()
  async deletePurchaseById(id: number): Promise<NestCommonRes> {
    // Fetch all related purchase details for all purchases to be deleted
    const purchaseDetails = await this._queryRunner.manager.find(PurchaseDetailsEntity, {
      where: { purchaseId: id },
    });
    console.log(id);

    console.log(purchaseDetails);


    for (const details of purchaseDetails) {
      await this._queryRunner.manager.decrement(ProductEntity, { productId: details.productId }, 'availableQuantity', details.productQuantity);
    }


    // Delete purchase details
    await this._queryRunner.manager.delete(PurchaseDetailsEntity, purchaseDetails);

    // Delete purchases
    const result = await this._queryRunner.manager.delete(PurchaseEntity, {
      id: id,
    });

    return { type: 'success', message: `${result.affected} purchases deleted`, status: true };
  }

  @MyTransaction()
  async deleteManyPurchases(purchase_ids: string[]): Promise<NestCommonRes> {
    // Fetch all related purchase details for all purchases to be deleted
    const purchaseDetails = await this._queryRunner.manager.find(PurchaseDetailsEntity, {
      where: { purchaseId: In(purchase_ids) },
    });



    // Adjust product quantities
    for (const details of purchaseDetails) {
      await this._queryRunner.manager.decrement(ProductEntity, { productId: details.productId }, 'availableQuantity', details.productQuantity);
    }

    // Delete purchase details
    await this._queryRunner.manager.delete(PurchaseDetailsEntity, {
      purchaseId: In(purchase_ids),
    });

    // Delete purchases
    const result = await this._queryRunner.manager.delete(PurchaseEntity, {
      id: In(purchase_ids),
    });

    return { type: 'success', message: `${result.affected} purchases deleted`, status: true };
  }


  private async _savePurchase(data: CreatePurchaseDto, purchaseId = null) {
    purchaseId = purchaseId ?? this.purchaseId();
    // Create purchase record
    const purchase = new PurchaseEntity();
    purchase.purchaseId = purchaseId; // Generate or use as per your requirement
    purchase.purchaseDate = new Date(data.purchaseDate);
    purchase.dueDate = new Date(data.dueDate);
    purchase.totalDiscount = data.totalDiscountInPer;
    purchase.totalTaxInAmount = data.totalTaxInAmount;
    purchase.shippingCost = data.shippingCost;
    purchase.subTotal = data.subTotal;
    purchase.status = data.status;
    purchase.netTotal = data.netTotal;
    purchase.supplierId = data.supplierId;

    const res = await this._queryRunner.manager.save(PurchaseEntity, purchase);

    let i = 0;
    for (const detail of data.purchaseDetails) {

      const product = await this._queryRunner.manager.findOne(ProductEntity, { where: { productId: detail.productId.productId } });
      if (!product) {
        throw new Error(`Product with ID ${detail.productId} not found.`);
      }
      product.availableQuantity = product.availableQuantity + detail.productQuantity;
      await this._queryRunner.manager.update(ProductEntity, product.id, product);

      // purchase Details
      const purchaseDetail = new PurchaseDetailsEntity();
      purchaseDetail.purchaseDetailsId = this.purchaseDetailId() + `${i}`;
      purchaseDetail.productId = detail.productId.productId;
      purchaseDetail.purchaseId = res.id;
      purchaseDetail.productPrice = detail.productPrice;
      purchaseDetail.productQuantity = detail.productQuantity;
      purchaseDetail.taxInPer = detail.taxInPer;
      purchaseDetail.productTotal = detail.productTotal;

      await this._queryRunner.manager.save(PurchaseDetailsEntity, purchaseDetail)
      i++;
    };
  }
}

