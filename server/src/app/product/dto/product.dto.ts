
import { IsString, IsNumber, IsBoolean, IsOptional, ValidateNested, IsObject, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export type ProductTypes = "GOODS" | "SERVICE"  


class NVObject {
    // Define properties and validations for discountIn object
    // Example:
    @IsString()
    name : string

    @IsString()
    value : string
}

class DiscountIn {
  // Define properties and validations for discountIn object
  // Example:
  @IsString()
  name : "%" | "fix"

  @IsString()
  value : "percentage" | "fix"
}


export class AddProductDTO {


    @IsString()
    productType: ProductTypes;

    @IsString()
    productName: string;

    @IsString()
    productDescription: string;

    @IsString()
    productCode: string;

    @IsString()
    discount: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => DiscountIn)
    discountIn: DiscountIn | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => NVObject)
    salesUnit: NVObject | null;

    @IsString()
    salesPrice: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => NVObject)
    purchaseUnit: NVObject | null;

    @IsString()
    purchasePrice: string;

    @IsNumber()
    openingQuantity: number;

    @IsNumber()
    lowStockReminder: number;

    @IsNumber()
    availableQuantity: number;

    @IsArray()
    @IsOptional()
    salesTax: any[] | null;

    @IsArray()
    @IsOptional()
    purchaseTax: any[] | null;

    @IsBoolean()
    taxesInclusive: boolean;

    @IsBoolean()
    isFree: boolean;
}
