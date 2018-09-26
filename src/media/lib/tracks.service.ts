import { Injectable } from '@nestjs/common';
import JsonDB from 'node-json-db';
import { Track } from '../models';

@Injectable()
export class TracksService {
  constructor(private _tracksDb: JsonDB) {}

  upsert(track: Track) {
    this._tracksDb.push(`/${track.id}`, track);
  }
}
