import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TaxService } from './tax.service';
import { TaxDto } from './dto/tax.dto';

@Controller('tax')
export class TaxController {

  constructor(private readonly _taxService: TaxService) {

  }


  // @Get('all')
  // getAll() {
  //   return this._taxService.getAll();
  // }

  // @Get(':taxId')
  // getByID(@Param('taxId') taxId: string) {
  //   return this._taxService.getById(taxId);
  // }

  
  @Post('/create')
  create(@Body() createTaxDto: TaxDto) {
    return this._taxService.createTax(createTaxDto)
  }

  // @Put('edit/:taxId')
  // editTax(@Param('taxId') taxId: string, @Body() tax: taxDto) {
  //   return this._taxService.editTax(tax,taxId)
  // }

}
