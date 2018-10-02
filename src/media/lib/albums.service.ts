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
    const album = this._albumsDb.getData(`/${id}`);
    album.tracks = this._tracks.loadByAlbum(album.id);
    return album;
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
