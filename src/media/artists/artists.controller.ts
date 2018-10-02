import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiImplicitBody, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { ArtistsService } from '../lib';
import { Artist } from '../models';

@ApiUseTags('Dashboard / Artists')
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

  @Post()
  @ApiImplicitBody({ name: 'Artist', type: Artist })
  create(@Body() artist: Artist) {
    return this._artists.upsert(artist);
  }

  @Post('/import')
  @ApiOperation({
    title: 'Import - You can ignore this operation 😴',
    description: 'This operation is used to migrate articles from an older API.'
  })
  @ApiImplicitBody({ name: 'Artist', type: Artist })
  import(@Body() artists: Artist[]) {
    artists.forEach(artist => this._artists.upsert(artist));
  }
}
