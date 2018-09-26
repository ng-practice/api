import { Injectable } from '@nestjs/common';
import JsonDB from 'node-json-db';
import { Album } from '../models';

@Injectable()
export class AlbumService {
  constructor(private _albumsDb: JsonDB) {}

  upsert(album: Album) {
    this._albumsDb.push(`/${album.id}`, album);
  }
}
