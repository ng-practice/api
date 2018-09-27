import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
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

  @Post('/import')
  @ApiOperation({
    title: 'Import - You can ignore this operation 😴',
    description: 'This operation is used to migrate articles from an older API.'
  })
  import(@Body() artists: Artist[]) {
    artists.forEach(artist => this._artists.upsert(artist));
  }
}
