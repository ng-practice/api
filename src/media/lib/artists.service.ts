import { Injectable } from '@nestjs/common';
import JsonDB from 'node-json-db';
import { Artist } from '../models';

@Injectable()
export class ArtistsService {
  constructor(private _artistsDb: JsonDB) {}

  upsert(artist: Artist) {
    this._artistsDb.push(`/${artist.id}`, artist);
  }
}
