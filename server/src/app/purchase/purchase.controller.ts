import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/purchase.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly _purchaseService: PurchaseService) { }

  @Post('/create')
  create(@Body() data: CreatePurchaseDto) {
    return this._purchaseService.createPurchase(data)
  }

  @Get('all')
  getAll() {
    return this._purchaseService.getAll();
  }

  @Get(':purchaseId')
  getByID(@Param('purchaseId') purchaseId: string) {
    return this._purchaseService.getPurchaseById(purchaseId);
  }

  @Put('edit/:purchaseId')
  edit(@Param('purchaseId') purchaseId: string, @Body() purchase: CreatePurchaseDto) {
    return this._purchaseService.updatePurchase(purchaseId, purchase)
  }


  @Delete('delete/:id')
  deleteById(@Param('id') id: number) {
    return this._purchaseService.deletePurchaseById(id);
  }

  @Delete('deleteMany')
  deleteMany(@Body('purchaseIds') purchase_ids: string[]) {
    return this._purchaseService.deleteManyPurchases(purchase_ids)
  }


}
