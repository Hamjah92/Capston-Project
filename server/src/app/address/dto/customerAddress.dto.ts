import { IsArray } from "class-validator";
import { Address } from "src/app/customer/types/Address.type";

export class AddressDto {
  @IsArray()
  addresses: Address[];
}