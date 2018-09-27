import { ApiModelProperty } from '@nestjs/swagger';

export class Artist {
  @ApiModelProperty({ required: true, example: 6001 })
  id: number;

  @ApiModelProperty({ required: true, example: 'Anna Netrebko' })
  name: string;

  @ApiModelProperty({
    required: true,
    type: 'string',
    format: 'date',
    example: '2017-08-21T06:20:32.232Z'
  })
  createdAt: string;

  @ApiModelProperty({
    required: true,
    type: 'string',
    format: 'date',
    example: '2017-08-21T06:20:32.232Z'
  })
  updatedAt: string;
}
