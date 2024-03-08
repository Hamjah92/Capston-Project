import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { ItemTypes } from "../dto/types/Item.type";

@Entity({ name: "items" })
export class ItemsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 150 })
  itemId: string;

  @Column()
  itemName: string;

  @Column()
  itemCode: string

  @Column()
  itemType: ItemTypes

  @Column({ nullable: true })
  itemDescription: string;

  @Column({ nullable: true })
  itemUnit: string;

  @Column({ nullable: true })
  itemUnitGroup: string;

  @Column()
  itemPricePerUnit: string;

  @Column({ default: '0' })
  discount: string

  @Column({ default: 'percentage' })
  discountIn: 'percentage' | 'rupees'

  @Column({ default: false })
  taxesInclusive: boolean

  @Column()
  hsnCode: string

  @Column()
  tax: string

  @Column({ type: "float", default: "0" })
  openingQuantity: number

  @Column({ type: "float", default: "0" })
  availableQuantity: number

  @Column({ default: 'Regular taxable supplies' })
  supplyType: string

  @Column({ default: "finishedGood" })
  supplyCategory: string


  @Column({ type: "float", nullable: true })
  lowStockReminder: number

  @Column({ default: true })
  stockable: boolean

  @Column({ default: true })
  saleable: boolean

  @Column({ nullable: true })
  purchasePrice: string

  @Column({ nullable: true })
  purchaseUnit: string

  @Column({ default: false })
  isFree: boolean

  @Column({ default: true })
  isActiveSupply: boolean

  @Column({ default: true })
  manufacturerDate: string

  @Column({ default: true })
  expireDate: string;
}