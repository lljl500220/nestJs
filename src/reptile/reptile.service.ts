import { Injectable } from '@nestjs/common';
import { CreateReptileDto } from './dto/create-reptile.dto';
import { UpdateReptileDto } from './dto/update-reptile.dto';

@Injectable()
export class ReptileService {
  create(createReptileDto: CreateReptileDto) {
    return 'This action adds a new reptile';
  }

  findAll() {
    return `This action returns all reptile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reptile`;
  }

  update(id: number, updateReptileDto: UpdateReptileDto) {
    return `This action updates a #${id} reptile`;
  }

  remove(id: number) {
    return `This action removes a #${id} reptile`;
  }
}
