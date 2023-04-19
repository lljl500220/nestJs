import { Module } from '@nestjs/common';
import { PigService } from './pig.service';
import { PigResolver } from './pig.resolver';

@Module({
  providers: [PigResolver, PigService]
})
export class PigModule {}
