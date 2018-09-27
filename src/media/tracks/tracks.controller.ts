import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiImplicitBody,
  ApiImplicitParam,
  ApiOperation,
  ApiUseTags
} from '@nestjs/swagger';
import { TracksService } from '../lib';
import { Track, TrackFromOldApi, AlbumFromOldApi } from '../models';

@ApiUseTags('Dashboard / Tracks')
@Controller('tracks')
export class TracksController {
  constructor(private _tracks: TracksService) {}

  @Get()
  all() {
    return this._tracks.loadAll();
  }

  @Get(':ids')
  @ApiImplicitParam({
    name: 'ids',
    type: 'string',
    description: 'Example: /tracks/1,2,3'
  })
  singles(@Param('ids') idsQuery: string) {
    const ids = idsQuery.split(',').map(id => +id);
    return this._tracks.loadTracksByIds(ids);
  }

  @Post()
  @ApiImplicitBody({ name: 'Track' })
  create(@Body() track: Track) {
    return this._tracks.upsert(track);
  }

  @Post('/import')
  @ApiOperation({
    title: 'Import - You can ignore this operation 😴',
    description: 'This operation is used to migrate articles from an older API.'
  })
  @ApiImplicitBody({ name: 'AlbumFromOldApi', type: AlbumFromOldApi })
  import(@Body() tracksRaw: TrackFromOldApi[]) {
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
