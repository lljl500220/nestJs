import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PigService } from './pig.service';
import { Pig } from './entities/pig.entity';
import { CreatePigInput } from './dto/create-pig.input';
import { UpdatePigInput } from './dto/update-pig.input';

@Resolver(() => Pig)
export class PigResolver {
  constructor(private readonly pigService: PigService) {}

  @Mutation(() => Pig)
  createPig(@Args('createPigInput') createPigInput: CreatePigInput) {
    return this.pigService.create(createPigInput);
  }

  @Query(() => [Pig], { name: 'pig' })
  findAll() {
    return this.pigService.findAll();
  }

  @Query(() => Pig, { name: 'pig' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.pigService.findOne(id);
  }

  @Mutation(() => Pig)
  updatePig(@Args('updatePigInput') updatePigInput: UpdatePigInput) {
    return this.pigService.update(updatePigInput.id, updatePigInput);
  }

  @Mutation(() => Pig)
  removePig(@Args('id', { type: () => Int }) id: number) {
    return this.pigService.remove(id);
  }
}
