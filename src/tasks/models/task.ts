import { ApiModelProperty } from '@nestjs/swagger';

export class Task {
  @ApiModelProperty({ required: true, example: '123-123' })
  guid: string;

  @ApiModelProperty({ required: true, example: 'Buy milk' })
  title: string;

  @ApiModelProperty({ required: false, example: '4 litres' })
  text: string;

  @ApiModelProperty({ required: false, example: false })
  isComplete: boolean;

  @ApiModelProperty({ required: false, example: true })
  isFavorite: boolean;
}
