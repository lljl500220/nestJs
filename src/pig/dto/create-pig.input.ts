import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePigInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
