import { Module } from '@nestjs/common';
import { join } from 'path';
import { AlbumsController } from './albums/albums.controller';
import { ArtistsController } from './artists/artists.controller';
import { AlbumService, ArtistsService, TracksService } from './lib';
import { TracksController } from './tracks/tracks.controller';

// tslint:disable-next-line:no-var-requires
const JsonDB = require('node-json-db');
const database = join(__dirname, '..', '..', 'database', 'dashboard', 'media');

@Module({
  controllers: [ArtistsController, AlbumsController, TracksController],
  providers: [
    {
      provide: AlbumService,
      useFactory(tracks) {
        return new AlbumService(
          new JsonDB(`${database}/albums`, true, true),
          tracks
        );
      },
      inject: [TracksService]
    },
    {
      provide: ArtistsService,
      useFactory(albums) {
        return new ArtistsService(
          new JsonDB(`${database}/artists`, true, true),
          albums
        );
      },
      inject: [AlbumService]
    },
    {
      provide: TracksService,
      useValue: new TracksService(new JsonDB(`${database}/tracks`, true, true))
    }
  ]
})
export class MediaModule {}
