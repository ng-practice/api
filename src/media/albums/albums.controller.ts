import { Body, Controller, Post, Get, All, Param } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AlbumService } from '../lib';

@ApiUseTags('Albums')
@Controller('albums')
export class AlbumsController {
  constructor(private _albums: AlbumService) {}

  @Get()
  all() {
    return this._albums.loadAll();
  }

  @Get(':id')
  single(@Param('id') id: number) {
    return this._albums.loadSingle(id);
  }

  @Post('/import')
  import(@Body() albumsRaw: any[]) {
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
