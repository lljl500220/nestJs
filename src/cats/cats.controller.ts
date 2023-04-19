import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';

@Controller({ host: 'localhost', path: '/cats' })
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get('findId:id')
  findId(@Param('id') params): string {
    return `获取到了id为${params.id}的猫咪`;
  }

  @Post('create')
  create(@Req() request: Request): string {
    return request.body.id;
  }

  @Get('findAll')
  findAll(@Query() query): string {
    console.log(query);
    return '收到了findAll请求';
  }

  @Get('findAsync')
  async findAsync(@Query() query): Promise<string> {
    console.log(query);
    return '收到了findAsync请求';
  }

  @Get('findOb')
  findOb(@Query() query): Observable<string> {
    console.log(query);
    return of('收到了findOb请求');
  }

  @Post('addCat')
  addCat(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
}
