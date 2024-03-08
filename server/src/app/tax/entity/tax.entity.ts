import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tax")

export class Tax {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taxName: string;

  @Column()
  taxRate: string

  @Column()
  taxType: string

}