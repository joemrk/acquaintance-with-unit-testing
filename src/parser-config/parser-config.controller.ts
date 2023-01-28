import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ParserConfigService } from './parser-config.service';
import { CreateParserConfigDto } from './dto/create-parser-config.dto';
import { UpdateParserConfigDto } from './dto/update-parser-config.dto';
import { UrlParams } from 'src/utils/validators/types/urlParam.type';

@Controller('parser-config')
export class ParserConfigController {
  constructor(private readonly parserConfigService: ParserConfigService) {}

  @Post()
  create(@Body() createParserConfigDto: CreateParserConfigDto) {
    return this.parserConfigService.create(createParserConfigDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.parserConfigService.findAll(query);
  }

  @Get(':id')
  findOne(@Param() params: UrlParams) {
    return this.parserConfigService.findOne(params.id);
  }

  @Patch(':id')
  update(
    @Param() params: UrlParams,
    @Body() updateParserConfigDto: UpdateParserConfigDto,
  ) {
    return this.parserConfigService.update(params.id, updateParserConfigDto);
  }

  @Delete(':id')
  remove(@Param() params: UrlParams) {
    return this.parserConfigService.remove(params.id);
  }
}
