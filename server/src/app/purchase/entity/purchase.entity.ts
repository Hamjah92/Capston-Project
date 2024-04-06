import { Supplier } from "src/app/supplier/entity/supplier.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PurchaseDetailsEntity } from "./purchaseDetails.entity";

@Entity("purchases")
export class PurchaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Assuming purchaseId serves as a unique external identifier
  @Column({ unique: true })
  purchaseId: string;



  // Date fields for tracking purchase and due dates
  @Column()
  purchaseDate: Date;

  @Column()
  dueDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  totalDiscount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalTaxInAmount: number;

  // Shipping cost associated with the purchase
  @Column('decimal', { precision: 10, scale: 2 })
  shippingCost: number;

  // Subtotal after discounts but before other adjustments
  @Column('decimal', { precision: 10, scale: 2 })
  subTotal: number;

  @Column({nullable:true})
  status: string;

  // Net total after all adjustments
  @Column('decimal', { precision: 10, scale: 2 })
  netTotal: number;

  @Column("text")
  supplierId: string;


  @OneToMany(() => PurchaseDetailsEntity, purchaseDetails => purchaseDetails.purchase)
  purchaseDetails: PurchaseDetailsEntity[];
  // Automated timestamps for record creation and updates

  // Many-to-One relationship with Supplier
  @ManyToOne(() => Supplier, supplier => supplier.purchases)
  @JoinColumn({ name: "supplierId" })
  supplier: Supplier;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
