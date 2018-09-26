import { Body, Controller, Post } from '@nestjs/common';
import { AlbumService } from '../lib';

@Controller('albums')
export class AlbumsController {
  constructor(private _albums: AlbumService) {}

  @Post('/import')
  import(@Body() albumsRaw: any[]) {
    albumsRaw.forEach(raw =>
      this._albums.upsert({
        id: raw.id,
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
