import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
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
  @ApiOperation({
    title: 'Import - You can ignore this operation 😴',
    description: 'This operation is used to migrate articles from an older API.'
  })
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
