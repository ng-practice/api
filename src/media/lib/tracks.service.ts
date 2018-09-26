import { Injectable } from '@nestjs/common';
import JsonDB from 'node-json-db';
import { Track } from '../models';

@Injectable()
export class TracksService {
  constructor(private _tracksDb: JsonDB) {}

  loadAll(): Track[] {
    const all = this._tracksDb.getData('/');
    return Object.values(all);
  }

  loadSingle(id: number): any {
    return this._tracksDb.getData(`/${id}`);
  }

  loadByAlbum(id: number): Track[] {
    const all = this._tracksDb.getData('/');

    return Object.values(all).filter(
      (track: Track) => track.albumId === id
    ) as Track[];
  }

  loadTracksByIds(ids: number[]): any {
    return ids.map(id => this._tracksDb.getData(`/${id}`));
  }

  upsert(track: Track) {
    this._tracksDb.push(`/${track.id}`, track);
  }
}
