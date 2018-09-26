import { Body, Controller, Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { NewsService } from './lib/news.service';
import { Article } from './models';

@ApiUseTags('News')
@Controller('news')
export class NewsController {
  constructor(private _news: NewsService) {}

  @Post()
  create(article: Article) {
    this._news.upsert(article);
  }

  @Post('/import')
  import(@Body() articles: Article[]) {
    articles.forEach(article => this._news.upsert(article));
  }
}
