import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
export class UserDto {

  @IsString()
  @IsOptional()
  name: string | null;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  pinCode: string;

}