import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ProductTypes } from "../dto/product.dto";

@Entity({ name: "products" })
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 150 })
  productId: string;

  @Column()
  productType: ProductTypes

  @Column()
  productName: string;

  @Column({ nullable: true })
  productDescription: string;

  @Column({ nullable: true })
  productCode: string

  @Column({ nullable: true })
  salesUnit: string;

  @Column()
  salesPrice: string;


  @Column({ nullable: true })
  purchaseUnit: string;

  @Column()
  purchasePrice: string;

  @Column({ default: '0' })
  discount: string

  @Column({ default: '%' })
  discountIn: '%' | 'fix'


  @Column({ default: false })
  taxesInclusive: boolean

  @Column()
  salesTax: string

  @Column()
  productTax: string

  @Column({ type: "float", default: "0" })
  openingQuantity: number
  
  @Column({ type: "float", nullable: true })
  lowStockReminder: number


  @Column({ type: "float", default: "0" })
  availableQuantity: number

  @Column({ default: false })
  isFree: boolean
  
}