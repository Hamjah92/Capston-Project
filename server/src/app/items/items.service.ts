import { Inject, Injectable } from '@nestjs/common';
import { CONNECTION } from 'src/public/tenancy/tenancy.provider';
import { Connection, QueryRunner } from 'typeorm';
import { ItemsEntity } from './entity/items.entity';

@Injectable()
export class ItemsService {
  private _queryRunner: QueryRunner;
  constructor(@Inject(CONNECTION) connection: Connection){
    this._queryRunner = connection.createQueryRunner()
  }

  getAllItems(){
   return this._queryRunner.manager.find(ItemsEntity,{})
  }
  
}
