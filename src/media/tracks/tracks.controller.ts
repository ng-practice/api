import { Controller, Post, Body } from '@nestjs/common';
import { TracksService } from '../lib';

@Controller('tracks')
export class TracksController {
  constructor(private _tracks: TracksService) {}

  @Post('/import')
  import(@Body() tracksRaw: any[]) {
    tracksRaw.forEach(raw =>
      this._tracks.upsert({
        id: raw.id,
        albumId: raw.album,
        artistId: raw.artist,
        title: raw.title,
        duration: raw.duration,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt
      })
    );
  }
}
