import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { SupplierDto } from './dto/supplier.dto';
import { SupplierService } from './supplier.service';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly _supplierService: SupplierService) { }

  @Post("/create")
  @HttpCode(201)
  createSupplier(@Body() createSupplerDto: SupplierDto) {
    return this._supplierService.create(createSupplerDto)
  }

  @Get('all')
  getAll() {
    return this._supplierService.getAll();
  }

  @Get(':supplierId')
  getByID(@Param('supplierId') supplierId: string) {
    return this._supplierService.getById(supplierId);
  }

  @Put('edit/:supplierId')
  editSupplier(@Param('supplierId') supplierId: string, @Body() supplier: SupplierDto) {
    console.log(supplierId);
    
    return this._supplierService.editSupplier(supplier,supplierId)
  }


  @Delete('delete/:supplier_id')
  deleteSupplierById(@Param('supplier_id') supplier_id: string) {
    return this._supplierService.deleteSupplierById(supplier_id);
  }

  @Delete('deleteMany')
  deleteManySupplier(@Body('supplierIds') supplier_ids: string[]) {
    return this._supplierService.deleteManySupplier(supplier_ids)
  }

}
