import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiImplicitBody, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AlbumService } from '../lib';
import { Album, AlbumFromOldApi } from '../models';

@ApiUseTags('Dashboard / Albums')
@Controller('albums')
export class AlbumsController {
  constructor(private _albums: AlbumService) {}

  @Get()
  all(): Album[] {
    return this._albums.loadAll();
  }

  @Get(':id')
  single(@Param('id') id: number) {
    return this._albums.loadSingle(id);
  }

  @Post()
  @ApiImplicitBody({ name: 'Album', type: Album })
  create(@Body() album: Album) {
    return this._albums.upsert(album);
  }

  @Post('/import')
  @ApiOperation({
    title: 'Import - You can ignore this operation 😴',
    description: 'This operation is used to migrate articles from an older API.'
  })
  @ApiImplicitBody({ name: 'AlbumFromOldApi', type: AlbumFromOldApi })
  import(@Body() albumsRaw: AlbumFromOldApi[]) {
    albumsRaw.forEach(raw =>
      this._albums.upsert({
        id: raw.id,
        name: raw.name,
        artistId: raw.artist,
        cover: raw.cover,
        coverSmall: raw.cover_small,
        coverMedium: raw.cover_medium,
        coverBig: raw.cover_big,
        coverXl: raw.cover_xl,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt
      })
    );
  }
}
