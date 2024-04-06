import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PurchaseEntity } from "./purchase.entity";

@Entity("purchaseDetails")
export class PurchaseDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Unique identifier for the purchase detail record
  @Column({ unique: true })
  purchaseDetailsId: string;

  // Reference to the purchase entity; consider ManyToOne relationship if needed
  @Column()
  purchaseId: number;

  // Reference to the product entity; consider ManyToOne relationship if needed
  @Column()
  productId: string;

  // Quantity of product; consider integer type if applicable
  @Column('decimal', { precision: 10, scale: 2 })
  productQuantity: number;

  // Price per unit of product; decimal to accurately reflect monetary value
  @Column('decimal', { precision: 10, scale: 2 })
  productPrice: number;

  // Discount applied to this item, if any; decimal type for precision
  @Column('decimal', { precision: 4, scale: 2, default: 0 })
  discountOnItem: number;

  @Column('decimal', { precision: 4, scale: 2, default: 0 })
  taxInPer: number;

  // Total cost for this item; calculated field, consider not storing if calculable
  @Column('decimal', { precision: 10, scale: 2 })
  productTotal: number;

  @ManyToOne(() => PurchaseEntity, purchase => purchase.purchaseDetails)
  @JoinColumn({ name: "purchaseId" }) // Customizes the FK column name
  purchase: PurchaseEntity;

  // Timestamps for record creation and last update
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
