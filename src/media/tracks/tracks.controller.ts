import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { TracksService } from '../lib';

@ApiUseTags('Tracks')
@Controller('tracks')
export class TracksController {
  constructor(private _tracks: TracksService) {}

  @Get()
  all() {
    return this._tracks.loadAll();
  }

  @Get(':ids')
  single(@Param('ids') idsQuery: string) {
    const ids = idsQuery.split(',').map(id => +id);
    return this._tracks.loadTracksByIds(ids);
  }

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
