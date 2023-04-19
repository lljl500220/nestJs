import { Injectable } from '@nestjs/common';
import { CreatePigInput } from './dto/create-pig.input';
import { UpdatePigInput } from './dto/update-pig.input';

@Injectable()
export class PigService {
  create(createPigInput: CreatePigInput) {
    return 'This action adds a new pig';
  }

  findAll() {
    return `This action returns all pig`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pig`;
  }

  update(id: number, updatePigInput: UpdatePigInput) {
    return `This action updates a #${id} pig`;
  }

  remove(id: number) {
    return `This action removes a #${id} pig`;
  }
}
