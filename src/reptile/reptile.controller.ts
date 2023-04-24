import { Controller, Get } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
@Controller('reptile')
export class ReptileController {
  @Get()
  async findAll() {
    const res = await axios.get(
      'https://image.baidu.com/search/albumsdetail?tn=albumsdetail&word=%E6%B8%90%E5%8F%98%E9%A3%8E%E6%A0%BC%E6%8F%92%E7%94%BB&fr=albumslist&album_tab=%E8%AE%BE%E8%AE%A1%E7%B4%A0%E6%9D%90&album_id=409&rn=30',
    );
    const $ = cheerio.load(res.data);
    const lis = $('.albumsdetail-item-img');
    console.log(lis.length);
    return '爬虫成功';
  }
}
