import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'customer_address' })
export class CustomerAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  addressId: string;

  @Column()
  customerId: string;

  @Column()
  businessAddress: string;

  @Column()
  pinCode: string;

  @Column()
  state: string;

  @Column({ nullable: true })
  city: string;

  @Column()
  addressType: 'Billing' | 'Shipping';

  @Column()
  isDefault: boolean;


}
