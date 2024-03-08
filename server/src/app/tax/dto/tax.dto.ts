import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class TaxDto {
  @IsString()
  @IsNotEmpty()
  taxName: string;

  @IsString()
  taxRate: string;

  @IsString()
  taxType: string;

}
