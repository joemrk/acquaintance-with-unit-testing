import { Injectable } from '@nestjs/common';
import { CreateParserConfigDto } from './dto/create-parser-config.dto';
import { UpdateParserConfigDto } from './dto/update-parser-config.dto';

@Injectable()
export class ParserConfigService {
  create(createParserConfigDto: CreateParserConfigDto) {
    return 'This action adds a new parserConfig';
  }

  findAll() {
    return `This action returns all parserConfig`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parserConfig`;
  }

  update(id: number, updateParserConfigDto: UpdateParserConfigDto) {
    return `This action updates a #${id} parserConfig`;
  }

  remove(id: number) {
    return `This action removes a #${id} parserConfig`;
  }
}
