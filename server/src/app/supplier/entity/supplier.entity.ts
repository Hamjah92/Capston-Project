import { PurchaseEntity } from "src/app/purchase/entity/purchase.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @OneToMany(() => PurchaseEntity, purchase => purchase.supplier)
  purchases: PurchaseEntity[];

}
