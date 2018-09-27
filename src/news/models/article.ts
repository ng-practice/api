import { ApiModelProperty } from '@nestjs/swagger';

export class Article {
  @ApiModelProperty({ required: true, example: 5001 })
  id: number;

  @ApiModelProperty({ required: true, example: 'Bundesgartenschau' })
  title: string;

  @ApiModelProperty({ required: true, example: 'In Leipzig, Sachsen' })
  description: string;

  @ApiModelProperty({ required: true, example: 'https://l.de' })
  link: string;

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
