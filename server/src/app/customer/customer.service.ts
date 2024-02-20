import { Inject, Injectable } from '@nestjs/common';
import { CustomerAddress } from '../address/entity/customerAddress.entity';
import { CONNECTION } from 'src/public/tenancy/tenancy.provider';
import { Connection, In, QueryRunner, Repository } from 'typeorm';
import { Customer } from './entity/customer.entity';
import { CustomerDto } from './dto/customer.dto';
import { Address } from './types/Address.type';
import { MyTransaction } from '../../common/decorators/Transaction.decorator';
@Injectable()
export class CustomerService {
  private _customerRepository: Repository<Customer>;
  private _addressRepository: Repository<CustomerAddress>;
  protected connection: Connection;
  private readonly _queryRunner: QueryRunner;
  constructor(@Inject(CONNECTION) connection: Connection) {
    this._customerRepository = connection.getRepository(Customer);
    this._addressRepository = connection.getRepository(CustomerAddress);
    this.connection = connection;
    this._queryRunner = connection.createQueryRunner();
  }

  customerId(): string {
    return 'cid' + new Date().getTime();
  }
  async getAll() {
    return await this._customerRepository.find({
      select: [
        'customerId',
        'customerName',
        'customerEmail',
        'customerPhone',
      ],
      order: { createdAt: "DESC" }
    });
  }
  async getById(customerId: string) {
    const customer = await this._findCustomer(customerId)
    const billingAddresses = await this._findAddresses(customerId, "Billing")

    const shippingAddresses = await this._findAddresses(customerId, "Shipping")
    return { customer, billingAddresses, shippingAddresses }
  }

  @MyTransaction()
  async createCustomer(createCustomerDto: CustomerDto) {
    const customer = new Customer()
    const { customerId, customerName } = await this._saveCustomer(customer, createCustomerDto, null);
    const addresses = createCustomerDto.addresses;
    for (const _custAddress of addresses) {
      await this._saveAddress(customerId, _custAddress);
    }
    return { message: `${customerName} add As customer Successfully`, type: 'success', status: true };
  }

  @MyTransaction()
  async editCustomer(updatedCustomer: CustomerDto, customerId: string) {
    const customer = await this._findCustomer(customerId);
    await this._saveCustomer(customer, updatedCustomer, customerId);
    const addresses = updatedCustomer.addresses;
    await this._deleteCustomerAddresses(customerId)
    for (const _custAddress of addresses) {
      await this._saveAddress(customerId, _custAddress);
    }
    return { message: `Customer Updated Successfully`, type: 'success', status: true };
  }
  @MyTransaction()
  async deleteCustomerById(customerId: string) {

    const result = await this._queryRunner.manager.delete(Customer, {
      customerId,
    });
    await this._queryRunner.manager.delete(CustomerAddress, {
      customerId
    })
    return { type: 'success', message: `${result.affected} customer deleted` }
  }

  @MyTransaction()
  async deleteManyCustomer(customer_ids: string[]) {

    const result = await this._queryRunner.manager.delete(Customer, {
      customerId: In(customer_ids),
    });
    await this._queryRunner.manager.delete(CustomerAddress, {
      customerId: In(customer_ids)
    })
    return { type: 'success', message: `${result.affected} customer deleted` }
  }

  private async _saveAddress(customerId: string, address: Address) {
    const cust_address = new CustomerAddress();
    cust_address.addressId = address.addressId;
    cust_address.isDefault = address.isDefault;
    cust_address.addressType = address.addressType;
    cust_address.customerId = customerId;
    cust_address.businessAddress = address.businessAddress;
    cust_address.pinCode = address.pinCode;
    cust_address.state = JSON.stringify(address.state);
    cust_address.city = address.city;
    return await this._queryRunner.manager.save(CustomerAddress, cust_address);
  }
  private async _saveCustomer(customer: Customer, createCustomerDto: CustomerDto, customerId: string | null) {
    customer.customerId = customerId || this.customerId();
    customer.customerName = createCustomerDto.customerName;
    customer.customerEmail = createCustomerDto.customerEmail || null;
    customer.customerPhone = createCustomerDto.customerPhone || null;
    customer.customerWhatsapp = createCustomerDto.customerWhatsapp || null;
    customer.customerBusinessName = createCustomerDto.customerBusinessName || null;
    customer.customerGST = createCustomerDto.customerGST || null;
    customer.customerPAN = createCustomerDto.customerPAN || null;
    if (!customerId) {
      await this._queryRunner.manager.save(Customer, customer);
    } else {
      await this._queryRunner.manager.update(Customer, { customerId: customerId }, customer);
    }
    return customer;
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
  private async _findCustomer(customerId: string, select?: (keyof Customer)[]) {
    if (!select) {
      select = ["customerName", "customerEmail", "customerPhone", "customerWhatsapp", "customerGST", "customerPAN", "customerBusinessName"]
    }
    return await this._customerRepository.findOneOrFail({
      where: { customerId: customerId },
      select: select
    })
  }

  private async _deleteCustomerAddresses(customerId: string) {
    await this._queryRunner.manager.delete(CustomerAddress, {
      customerId: customerId,
    })
  }
}
