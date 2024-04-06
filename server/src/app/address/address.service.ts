import { Inject, Injectable } from '@nestjs/common';
import { CONNECTION } from 'src/public/tenancy/tenancy.provider';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { CustomerAddress } from './entity/customerAddress.entity';

@Injectable()
export class AddressService {
  private _addressRepository: Repository<CustomerAddress>;
  protected connection: Connection;
  private readonly _queryRunner: QueryRunner;
  constructor(@Inject(CONNECTION) connection: Connection) {
    this._addressRepository = connection.getRepository(CustomerAddress);
    this.connection = connection;
    this._queryRunner = connection.createQueryRunner();
  }
  async getByCustomerId(customerId: string) {
    const addresses = await this._findAddresses(customerId, "Billing")
    return addresses 
  }

  private async _findAddresses(customerId: string, type: 'Billing' | 'Shipping', select?: (keyof CustomerAddress)[]) {
    if (!select) {
      select = ["addressId", "addressType", "businessAddress", "city", "pinCode", "state", "isDefault"]
    }
    const addresses = await this._addressRepository.find({
      where: { customerId: customerId, addressType: type },
      select: select
    })
    return addresses.map((address) => {
      return { ...address, state: JSON.parse(address.state) }
    })
  }

}
