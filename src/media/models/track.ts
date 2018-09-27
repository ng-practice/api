import { ApiModelProperty } from '@nestjs/swagger';

export class Track {
  @ApiModelProperty({ required: true, example: 7001 })
  id: number;

  @ApiModelProperty({ required: true, example: 8001 })
  albumId: number;

  @ApiModelProperty({ required: true, example: 9001 })
  artistId: number;

  @ApiModelProperty({ required: true, example: 'Leben, Menschen, Welt' })
  title: string;

  @ApiModelProperty({ required: true, example: 222 })
  duration: number;

  @ApiModelProperty({
    required: true,
    type: 'string',
    format: 'date',
    example: '2017-08-21T06:20:32.232Z'
  })
  createdAt: Date;

  @ApiModelProperty({
    required: true,
    type: 'string',
    format: 'date',
    example: '2017-08-21T06:20:32.232Z'
  })
  updatedAt: Date;
}
