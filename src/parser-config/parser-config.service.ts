import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateParserConfigDto } from './dto/create-parser-config.dto';
import { UpdateParserConfigDto } from './dto/update-parser-config.dto';
import {
  ParserConfig,
  ParserConfigDocument,
} from './schemas/parser-config.schema';

@Injectable()
export class ParserConfigService {
  constructor(
    @InjectModel(ParserConfig.name)
    private parserDocumentModel: Model<ParserConfigDocument>,
  ) {}

  create(createParserConfigDto: CreateParserConfigDto) {
    return this.parserDocumentModel.create(createParserConfigDto);
  }

  findAll(query: Record<string, any>) {
    const findCondition = {};
    const findOpt = {
      limit: 10,
      skip: 0,
      sort: {
        createdAt: 1,
      },
    };

    // for exclude wrong params
    if (query.status) {
      Object.assign(findCondition, { status: query.status });
    }

    if (query.sort) {
      const [field, order] = query.sort.split('||');
      findOpt.sort[field] = order === 'DESC' ? -1 : 1;
    }

    if (query.skip) {
      findOpt.skip = query.skip;
    }

    if (query.limit) {
      findOpt.limit = query.limit;
    }

    return this.parserDocumentModel.find(findCondition, null, findOpt);
  }

  async findOne(id: string) {
    const exist = await this.parserDocumentModel.findOne({ _id: id });

    if (!exist) {
      throw new NotFoundException(`Entity {${id}} not found.`);
    }

    return exist;
  }

  async update(id: string, updateParserConfigDto: UpdateParserConfigDto) {
    // const updateResult = await this.parserDocumentModel.updateOne(
    //   { _id: id },
    //   updateParserConfigDto,
    // );
    // return !!updateResult.modifiedCount;

    const exist = await this.parserDocumentModel.findOne({
      _id: id,
    });

    if (!exist) {
      throw new NotFoundException(`Entity {${id}} not found.`);
    }

    Object.assign(exist, updateParserConfigDto);

    return exist.save();
  }

  async remove(id: string) {
    const deletedResult = await this.parserDocumentModel.deleteOne({
      _id: id,
    });

    if (!deletedResult.deletedCount) {
      throw new NotFoundException();
    }

    return deletedResult.acknowledged;
  }
}
