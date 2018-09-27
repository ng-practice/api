import { ApiModelProperty } from '@nestjs/swagger';

export class TrackFromOldApi {
  @ApiModelProperty({ required: true })
  id: number;

  @ApiModelProperty() album: number;
  @ApiModelProperty() artist: number;
  @ApiModelProperty() title: string;
  @ApiModelProperty() duration: number;
  @ApiModelProperty() createdAt: Date;
  @ApiModelProperty() updatedAt: Date;
}
