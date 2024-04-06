import { IsNotEmpty, IsNumber, Min, IsDecimal } from 'class-validator';

export class PurchaseDetailsDto {
  @IsNotEmpty()
  productId: any;  // Updated to any to match the yup.mixed() type

  @IsNumber()
  @Min(1)
  productQuantity: number;

  @IsDecimal({ decimal_digits: '0,2' })
  @Min(0)
  productPrice: number;

  @IsDecimal({ decimal_digits: '0,2' })
  @Min(0)
  taxInPer: number;

  @IsDecimal({ decimal_digits: '0,2' })
  @Min(0)
  productTotal: number;
}
