import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParserConfigService } from './parser-config.service';
import { CreateParserConfigDto } from './dto/create-parser-config.dto';
import { UpdateParserConfigDto } from './dto/update-parser-config.dto';

@Controller('parser-config')
export class ParserConfigController {
  constructor(private readonly parserConfigService: ParserConfigService) {}

  @Post()
  create(@Body() createParserConfigDto: CreateParserConfigDto) {
    return this.parserConfigService.create(createParserConfigDto);
  }

  @Get()
  findAll() {
    return this.parserConfigService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parserConfigService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParserConfigDto: UpdateParserConfigDto,
  ) {
    return this.parserConfigService.update(+id, updateParserConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parserConfigService.remove(+id);
  }
}
