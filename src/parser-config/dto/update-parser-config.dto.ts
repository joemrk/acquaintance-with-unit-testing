import { PartialType } from '@nestjs/mapped-types';
import { CreateParserConfigDto } from './create-parser-config.dto';

export class UpdateParserConfigDto extends PartialType(CreateParserConfigDto) {}
