import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Address } from '../types/Address.type';

export class CustomerDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsOptional()
  customerCategory: object;

  @IsOptional()
  customerGST: string;

  @IsOptional()
  customerPAN: string;

  @IsOptional()
  customerBusinessName: string;

  @IsOptional()
  customerPhone: string;

  @IsOptional()
  customerWhatsapp: string;

  @IsEmail()
  customerEmail: string;

  // @IsArray()
  // addresses: Address[]
}
