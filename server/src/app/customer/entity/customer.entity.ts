import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "customers" })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true})
  customerId: string;

  @Column({ nullable: true })
  customerCategory: string;

  @Column()
  customerName: string;

  @Column({ nullable: true, unique: true})
  customerPhone: string;

  @Column({ nullable: true, unique: true })
  customerWhatsapp: string;

  @Column({ nullable: true })
  customerBusinessName: string;

  @Column({ unique: true, nullable: true })
  customerEmail: string;

  @Column({ nullable: true})
  customerGST: string;

  @Column({ unique: true, nullable: true})
  customerPAN: string;

  @Column({ default: true })
  status: Boolean = true;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
