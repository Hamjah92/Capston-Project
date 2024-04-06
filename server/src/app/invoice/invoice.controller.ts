import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InvoiceDto } from './dto/invoice.dto';
import { InvoiceService } from './invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly _invoiceService: InvoiceService) { }


  @Post('/create')
  create(@Body() data: InvoiceDto) {
    return this._invoiceService.createInvoice(data)
  }

  @Get('all')
  getAll() {
    return this._invoiceService.getAll();
  }

  @Get(':invoiceId')
  getByID(@Param('invoiceId') invoiceId: string) {
    return this._invoiceService.getInvoiceById(invoiceId);
  }

  @Put('edit/:invoiceId')
  edit(@Param('invoiceId') invoiceId: string, @Body() invoice: InvoiceDto) {
    return this._invoiceService.updateInvoice(invoiceId, invoice)
  }


  @Delete('delete/:id')
  deleteById(@Param('id') id: number) {
    return this._invoiceService.deleteInvoiceById(id);
  }

  @Delete('deleteMany')
  deleteMany(@Body('invoiceIds') invoice_ids: string[]) {
    return this._invoiceService.deleteManyInvoices(invoice_ids)
  }
}
