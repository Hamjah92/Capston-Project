import { Controller, Get } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private _itemService: ItemsService) { }

  @Get("all")
  getAllItems(){
    return this._itemService.getAllItems()
  }
}
