import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("invoices")
export class InvoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: "varchar" })
  invoiceId: string;

  @Column({ type: "varchar" })
  customerId: string;

  @Column({ type: "varchar", nullable: true })
  addressId: string;

  // Date fields for tracking invoice and due dates
  @Column()
  invoiceDate: Date;

  @Column()
  dueDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  totalDiscount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalTaxInAmount: number;

  // Shipping cost associated with the invoice
  @Column('decimal', { precision: 10, scale: 2 })
  shippingCost: number;

  // Subtotal after discounts but before other adjustments
  @Column('decimal', { precision: 10, scale: 2 })
  subTotal: number;

  // Net total after all adjustments
  @Column('decimal', { precision: 10, scale: 2 })
  netTotal: number;

  @Column({ nullable: true })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
