import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SupplierDto {
  @IsString()
  @IsNotEmpty()
  supplierName: string;

  @IsString()
  @IsOptional()
  supplierGST: string;

  @IsString()
  @IsOptional()
  supplierPhone: string;

  @IsOptional()
  @IsEmail()
  supplierEmail: string;
}
