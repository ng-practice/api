import { Body, Controller, Get, Post, All, Param } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiUseTags } from '@nestjs/swagger';
import { ArtistsService } from '../lib';
import { Artist } from '../models';
import { single } from 'rxjs/operators';

@ApiUseTags('Artists')
@Controller('artists')
export class ArtistsController {
  constructor(private _artists: ArtistsService) {}

  @Get()
  all() {
    return this._artists.loadAll();
  }

  @Get(':id')
  single(@Param('id') id: number) {
    return this._artists.loadSingle(id);
  }

  @Post('/import')
  import(@Body() artists: Artist[]) {
    artists.forEach(artist => this._artists.upsert(artist));
  }
}
