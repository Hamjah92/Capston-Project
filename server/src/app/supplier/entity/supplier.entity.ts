import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "suppliers" })
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true})
  supplierId: string;

  @Column()
  supplierName: string;

  @Column({ nullable: true, unique: true})
  supplierPhone: string;


  @Column({ unique: true, nullable: true })
  supplierEmail: string;

  @Column({ nullable: true})
  supplierGST: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
