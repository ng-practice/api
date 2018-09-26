import { Body, Controller, Post } from '@nestjs/common';
import { ArtistsService } from '../lib';
import { Artist } from '../models';

@Controller('artists')
export class ArtistsController {
  constructor(private _artists: ArtistsService) {}

  @Post('/import')
  import(@Body() artists: Artist[]) {
    artists.forEach(artist => this._artists.upsert(artist));
  }
}
