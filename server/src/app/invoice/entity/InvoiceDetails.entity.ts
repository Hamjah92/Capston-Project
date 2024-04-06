import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("invoiceDetails")
export class InvoiceDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Unique identifier for the invoice detail record
  @Column({ unique: true })
  invoiceDetailsId: string;

  // Reference to the invoice entity; consider ManyToOne relationship if needed
  @Column()
  invoiceId: number;

  // Reference to the product entity; consider ManyToOne relationship if needed
  @Column()
  productId: string;

  // Quantity of product; consider integer type if applicable
  @Column('decimal', { precision: 10, scale: 2 })
  productQuantity: number;

  // Price per unit of product; decimal to accurately reflect monetary value
  @Column('decimal', { precision: 10, scale: 2 })
  productPrice: number;

  @Column('decimal', { precision: 4, scale: 2, default: 0 })
  taxInPer: number;

  // Total cost for this item; calculated field, consider not storing if calculable
  @Column('decimal', { precision: 10, scale: 2 })
  productTotal: number;

  // Timestamps for record creation and last update
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
