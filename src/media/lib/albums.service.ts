import { Injectable } from '@nestjs/common';
import JsonDB from 'node-json-db';
import { Album } from '../models';
import { TracksService } from './tracks.service';

@Injectable()
export class AlbumService {
  constructor(private _albumsDb: JsonDB, private _tracks: TracksService) {}

  loadAll(): Album[] {
    const all = this._albumsDb.getData('/');
    return Object.values(all);
  }

  loadSingle(id: number): any {
    const artist = this._albumsDb.getData(`/${id}`);
    artist.albums = this._tracks.loadByAlbum(artist.id);
    return artist;
  }

  loadByArtist(id: number): Album[] {
    const all = this._albumsDb.getData('/');
    return Object.values(all).filter(
      (album: Album) => album.artistId === id
    ) as Album[];
  }

  upsert(album: Album) {
    this._albumsDb.push(`/${album.id}`, album);
  }
}
