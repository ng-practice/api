import { ApiModelProperty } from '@nestjs/swagger';

export class Album {
  @ApiModelProperty({ required: true, example: 6001 })
  id: number;

  @ApiModelProperty({ required: true, example: 7001 })
  artistId: number;

  @ApiModelProperty({ required: true, example: 'Regen' })
  name: string;

  @ApiModelProperty({ required: true, example: 'https://dummyimage.com/qvga' })
  cover: string;

  @ApiModelProperty({ required: false, example: 'https://dummyimage.com/qvga' })
  coverSmall: string;

  @ApiModelProperty({ required: false, example: 'https://dummyimage.com/qvga' })
  coverMedium: string;

  @ApiModelProperty({ required: false, example: 6001 })
  coverBig: string;

  @ApiModelProperty({ required: false, example: 6001 })
  coverXl: string;

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
