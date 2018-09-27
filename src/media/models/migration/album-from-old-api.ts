import { ApiModelProperty } from '@nestjs/swagger';

export class AlbumFromOldApi {
  @ApiModelProperty({ required: true })
  id: number;
  @ApiModelProperty() artist: number;
  @ApiModelProperty() name: string;
  @ApiModelProperty() cover: string;
  @ApiModelProperty() cover_small: string;
  @ApiModelProperty() cover_medium: string;
  @ApiModelProperty() cover_big: string;
  @ApiModelProperty() cover_xl: string;
  @ApiModelProperty() createdAt: Date;
  @ApiModelProperty() updatedAt: Date;
}
