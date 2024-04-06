import { Controller, Get, Param } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly _addressService: AddressService) {

  }

  @Get(":customerId")
  getByCustomerId(@Param('customerId') customerId: string) {
    return this.getByCustomerId(customerId)
  }
}
