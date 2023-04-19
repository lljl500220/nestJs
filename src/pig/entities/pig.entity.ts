import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Pig {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
