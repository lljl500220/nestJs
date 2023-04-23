import { IsString, IsNumber } from 'class-validator';
export class CreateUserDto {
  @IsString({ message: '参数需要类型为string' })
  name: string;
  @IsNumber()
  age: number;
  @IsString()
  uid: string;
}
