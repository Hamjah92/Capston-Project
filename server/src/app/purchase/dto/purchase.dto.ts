import { IsArray, IsDateString, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { PurchaseDetailsDto } from './purchaseDetails.dto';

export class CreatePurchaseDto {
  @IsNotEmpty()
  @IsDateString()
  purchaseDate: Date;

  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;

  @IsNumber()
  @Min(0)
  totalDiscountInPer: number;

  @IsNumber()
  @Min(0)
  totalTaxInAmount: number;

  @IsNumber()
  @Min(0)
  shippingCost: number;

  @IsNumber()
  @Min(0)
  subTotal: number;

  @IsNumber()
  @Min(0)
  netTotal: number;

  @IsString()
  supplierId: string;

  @IsString()
  status: string;

  @IsArray()
  purchaseDetails : PurchaseDetailsDto[]
}
