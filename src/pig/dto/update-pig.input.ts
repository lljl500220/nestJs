import { CreatePigInput } from './create-pig.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePigInput extends PartialType(CreatePigInput) {
  @Field(() => Int)
  id: number;
}
