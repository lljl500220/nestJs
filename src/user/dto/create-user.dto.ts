import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '请输入id' })
  id: string;

  name: string;

  password: string;

  age: number;
}
