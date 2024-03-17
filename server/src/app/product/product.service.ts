import { Inject, Injectable } from '@nestjs/common';
import { ProductEntity } from './entity/product.entity'; // Assuming you have a Product entity
import { Connection, In, QueryRunner, Repository } from 'typeorm';
import { CONNECTION } from 'src/public/tenancy/tenancy.provider';
import { MyTransaction } from 'src/common/decorators/Transaction.decorator';
import { AddProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  private readonly productRepository: Repository<ProductEntity>;
  protected readonly connection: Connection;
  private readonly queryRunner: QueryRunner;

  constructor(@Inject(CONNECTION) connection: Connection) {
    this.connection = connection;
    this.queryRunner = connection.createQueryRunner();
    this.productRepository = connection.getRepository(ProductEntity);
  }

  private productIdPrefix(): string {
    return 'Prod' + new Date().getTime();
  }

  @MyTransaction()
  async deleteManyProducts(productIds: string[]) {
    const result = await this.queryRunner.manager.delete(ProductEntity, {
      productId: In(productIds)
    });
    return { type: 'success', message: `${result.affected} products deleted` };
  }

  async getAll() {
    return await this.productRepository.find({
      select: [
        "productName",
        "productCode",
        "availableQuantity",
        "salesPrice"
      ],
      order: { productName: "ASC" }
    });
  }

  async getById(productId: string) {
    const product = await this._findProduct(productId);
    return { product };
  }

  public async create(createProductDto: AddProductDTO) {
    const product = new ProductEntity();
    const savedProduct = await this._saveProduct(product, createProductDto);
    return { message: `${savedProduct.productName} added successfully`, type: 'success', status: true };
  }

  async editProduct(productId: string, productDto: AddProductDTO) {
    const product = await this._findProduct(productId);
    await this._saveProduct(product, productDto);
    return { message: `Product updated successfully`, type: 'success', status: true };
  }

  async deleteProductById(productId: string) {
    const result = await this.queryRunner.manager.delete(ProductEntity, { productId });
    return { type: 'success', message: `${result.affected} product deleted` };
  }

  private async _saveProduct(product: ProductEntity, productDto: AddProductDTO) {
    // Directly map fields from DTO to Entity
    product.productName = productDto.productName;
    product.productDescription = productDto.productDescription;
    product.productCode = productDto.productCode;
    product.discount = productDto.discount;


    product.discountIn = productDto.discountIn.value;
    product.salesUnit = productDto.salesUnit.value;

    product.salesPrice = productDto.salesPrice;
    product.purchaseUnit = productDto.purchaseUnit.value;
    product.purchasePrice = productDto.purchasePrice;

    product.openingQuantity = productDto.openingQuantity;
    product.lowStockReminder = productDto.lowStockReminder;
    product.availableQuantity = productDto.availableQuantity;

    product.tax = productDto.SalesTax;
    product.tax = productDto.PurchaseTax;
    product.taxesInclusive = productDto.taxesInclusive;
    product.isFree = productDto.isFree;


    product.productType = productDto.productType;

    // Save the product entity using the provided QueryRunner.
    // This allows you to control transaction scope outside of this method if necessary.
    await this.queryRunner.manager.save(product);

    return product;
  }

  private async _findProduct(productId: string) {
    // Assuming your Product entity has similar fields to the Supplier entity
    return await this.productRepository.findOneOrFail({
      where: { productId: productId },
    });
  }
}
