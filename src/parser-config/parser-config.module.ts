import { Module } from '@nestjs/common';
import { ParserConfigService } from './parser-config.service';
import { ParserConfigController } from './parser-config.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ParserConfig,
  ParserConfigSchema,
} from './schemas/parser-config.schema';
import { updatedAtHelper } from 'src/utils/updatedAtHelper';

export const parserConfigSchemaFactory = {
  name: ParserConfig.name,
  useFactory: () => {
    const schema = ParserConfigSchema;
    schema.pre('updateOne', updatedAtHelper);
    schema.pre('save', updatedAtHelper);
    return schema;
  },
};

@Module({
  imports: [MongooseModule.forFeatureAsync([parserConfigSchemaFactory])],
  controllers: [ParserConfigController],
  providers: [ParserConfigService],
})
export class ParserConfigModule {}
