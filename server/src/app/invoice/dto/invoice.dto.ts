import { IsArray, IsDateString, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { InvoiceDetailsDto } from './invoiceDetails.dto';

export class InvoiceDto {

  @IsString()
  customerId: string;

  @IsOptional()
  @IsString()
  addressId: string;

  @IsNotEmpty()
  @IsDateString()
  invoiceDate: Date;

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
  status: string;

  @IsArray()
  invoiceDetails: InvoiceDetailsDto[]
}
