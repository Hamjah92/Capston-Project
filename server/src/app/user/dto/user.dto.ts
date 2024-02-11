import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
export class UserDto {

  @IsString()
  @IsOptional()
  firstName: string | null;

  @IsString()
  @IsOptional()
  lastName: string | null;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string

}