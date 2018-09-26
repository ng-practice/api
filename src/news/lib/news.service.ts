import { Injectable } from '@nestjs/common';
import JsonDB from 'node-json-db';
import { Article } from '../models';

@Injectable()
export class NewsService {
  constructor(private _newsDb: JsonDB) {}

  upsert(article: Article) {
    this._newsDb.push(`/${article.id}`, article);
  }
}
