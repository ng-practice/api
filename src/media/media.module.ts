import { Module } from '@nestjs/common';
import { ArtistsController } from './artists/artists.controller';
import { AlbumsController } from './albums/albums.controller';
import { TracksController } from './tracks/tracks.controller';

@Module({
  controllers: [ArtistsController, AlbumsController, TracksController]
})
export class MediaModule {}
