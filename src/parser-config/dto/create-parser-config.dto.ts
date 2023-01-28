import { IsBoolean, Length } from 'class-validator';
import { IsNotEmptySpace } from 'src/utils/validators/isNoEmptySpace';

export class CreateParserConfigDto {
  @Length(1, 255)
  @IsNotEmptySpace()
  target: string;

  @IsBoolean()
  inChat: boolean;

  @IsBoolean()
  inChanel: boolean;
}
