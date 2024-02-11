import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly _customerService: CustomerService) { }

  @Get('all')
  getAll() {
    return this._customerService.getAll();
  }

  @Get(':customerId')
  getByID(@Param('customerId') customerId: string) {
    return this._customerService.getById(customerId);
  }

  @Put('edit/:customerId')
  editCustomer(@Param('customerId') customerId: string, @Body() customer: CustomerDto) {
    return this._customerService.editCustomer(customer,customerId)
  }

  @Post('/create')
  create(@Body() createCustomerDto: CustomerDto) {
    return this._customerService.createCustomer(createCustomerDto)
  }

  @Delete('delete/:customer_id')
  deleteCustomerById(@Param('customer_id') customer_id: string) {
    return this._customerService.deleteCustomerById(customer_id);
  }
  @Delete('deleteMany')
  deleteManyCustomer(@Body('customerIds') customer_ids: string[]) {
    return this._customerService.deleteManyCustomer(customer_ids)
  }
}
