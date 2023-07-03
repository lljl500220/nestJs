import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
  SetMetadata,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';
import { Response } from 'express';
import { Login } from './interface/user.interface';
import { UserGuard } from './user/user.guard';
import axios from 'axios';
const obj: Login = {
  uId: '123',
  password: '123',
  verification: '123',
};

const appSecret = '8ea06076af3b0fd651d60c8902d76bc7';

@Controller('user')
@UseGuards(UserGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @SetMetadata('role', ['admin'])
  login(@Body() login: Login, @Session() session) {
    const resObj = {
      code: 0,
      msg: '登录成功',
    };
    if (login.uId !== obj.uId) {
      resObj.code = 1;
      resObj.msg = '用户名不存在，请检查或去注册新账号';
    } else if (login.password !== obj.password) {
      resObj.msg = '用户名和密码不匹配';
      resObj.code = 2;
    } else if (login.verification !== session.code) {
      resObj.msg = '验证码错误';
      resObj.code = 3;
    }
    return resObj;
  }

  @Post()
  @SetMetadata('role', ['admin'])
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('code')
  createCode(@Res() res: Response, @Session() session) {
    // return '1';
    const code = svgCaptcha.create({
      width: 100,
      height: 35,
      fontSize: 44,
      size: 4,
      background: '#ffe674',
    });
    session.code = code.text;
    res.type('image/svg+xml');
    res.send(code.data);
  }

  @Get()
  async findAll(@Query() query, @Res() res: Response) {
    const data = await this.userService.findAll(query);
    res.send({
      success: false,
      time: new Date(),
      data: data,
      status: 999999,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('wxlogin')
  async wxlogin(@Query('code') code: string) {
    const token = await axios.get(
      'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx44f087fc6112358a&secret=8ea06076af3b0fd651d60c8902d76bc7',
    );
    const res = await axios.post(
      `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${token.data.access_token}`,
      {
        code,
      },
    );
    return res.data;
  }

  @Get('getScan')
  async getScan(@Query('ztId') ztId: string, @Res() res: Response) {
    const token = await axios.get(
      'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx44f087fc6112358a&secret=8ea06076af3b0fd651d60c8902d76bc7',
    );
    const img = await axios.post(
      `https://api.weixin.qq.com/wxa/getwxacode?access_token=${token.data.access_token}`,
      {
        path: `pages/index/index?ztId=${ztId}`,
      },
      {
        responseType: 'arraybuffer',
      },
    );
    res.header(img.headers);
    res.send(img.data);
  }
}
