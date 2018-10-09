import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiImplicitBody, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { NewsService } from './lib/news.service';
import { Article } from './models';

@ApiUseTags('Dashboard / News')
@Controller('news')
export class NewsController {
  constructor(private _news: NewsService) {}

  @Get()
  getAll() {
    return this._news.loadAll();
  }

  @Post()
  @ApiImplicitBody({ name: 'Article', type: Article })
  create(@Body() article: Article) {
    this._news.upsert(article);
  }

  @Post('/import')
  @ApiOperation({
    title: 'Import - You can ignore this operation 😴',
    description: 'This operation is used to migrate articles from an older API.'
  })
  import(@Body() articles: Article[]) {
    articles.forEach(article => this._news.upsert(article));
  }
}
