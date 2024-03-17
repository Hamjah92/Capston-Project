import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaxService } from './tax.service';
import { TaxDto } from './dto/tax.dto';

@Controller('tax')
export class TaxController {

  constructor(private readonly _taxService: TaxService) {

  }


  @Get('all')
  getAll() {
    return this._taxService.getAll();
  }

  @Get(':taxId')
  getByID(@Param('taxId') taxId: number) {
    return this._taxService.getById(taxId);
  }

  
  @Post('/create')
  create(@Body() createTaxDto: TaxDto) {
    return this._taxService.createTax(createTaxDto)
  }

  @Put('edit/:taxId')
  editTax(@Param('taxId') taxId: number, @Body() tax: TaxDto) {
    return this._taxService.editTax(tax,taxId)
  }

  

  @Delete('delete/:tax_id')
  deleteTaxById(@Param('tax_id') tax_id: number) {
    return this._taxService.deleteTaxById(tax_id);
  }

  @Delete('deleteMany')
  deleteManyTax(@Body('taxIds') tax_ids: number[]) {
    return this._taxService.deleteManyTax(tax_ids)
  }

}
