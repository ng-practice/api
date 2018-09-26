import { Injectable } from '@nestjs/common';
import JsonDB from 'node-json-db';
import { Artist } from '../models';
import { AlbumService } from './albums.service';

@Injectable()
export class ArtistsService {
  constructor(private _artistsDb: JsonDB, private _albums: AlbumService) {}

  upsert(artist: Artist) {
    this._artistsDb.push(`/${artist.id}`, artist);
  }

  loadSingle(id: number): any {
    const artist = this._artistsDb.getData(`/${id}`);
    artist.albums = this._albums.loadByArtist(artist.id);
    return artist;
  }

  loadAll(): Artist[] {
    const all = this._artistsDb.getData('/');
    return Object.values(all);
  }
}
