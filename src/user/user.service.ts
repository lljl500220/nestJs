import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const data = new User();
    data.name = createUserDto.name;
    data.age = createUserDto.age;
    data.password = createUserDto.password;
    await this.user.save(data);
    return '成功';
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    try {
      const data = await this.user.find({
        where: {
          name: Like(`%${query.keyWord}%`),
        },
        order: {
          id: 'DESC',
        },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      });
      return data;
    } catch (e) {
      return e.message;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
