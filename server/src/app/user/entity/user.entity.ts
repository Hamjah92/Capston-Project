import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenantId: string;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column({nullable: true})
  avatar: string;

  @Column({ nullable: true, type:"text"})
  address: string;

  @Column({ nullable: true})
  country: string;

  @Column({ nullable: true})
  pinCode: string;

  @Column({ unique: true })
  email: string;

}
