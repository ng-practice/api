import { Module } from '@nestjs/common';
import { join } from 'path';
import { NewsService } from './lib/news.service';
import { NewsController } from './news.controller';

// tslint:disable-next-line:no-var-requires
const JsonDB = require('node-json-db');
const database = join(__dirname, '..', '..', 'database', 'dashboard', 'news');

@Module({
  providers: [
    {
      provide: NewsService,
      useValue: new NewsService(new JsonDB(`${database}/news`, true, true))
    }
  ],
  controllers: [NewsController]
})
export class NewsModule {}
