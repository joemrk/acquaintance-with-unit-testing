import { IsEnum, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateParserConfigDto } from './create-parser-config.dto';
import { ParserStatus } from '../enum/parser-status.enum';

export class UpdateParserConfigDto extends PartialType(CreateParserConfigDto) {
  @IsEnum(ParserStatus)
  @IsOptional()
  status?: ParserStatus;

  // just for tests
  createdAt?: Date;
}
