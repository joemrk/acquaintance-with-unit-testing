import { Module } from '@nestjs/common';
import { ParserConfigService } from './parser-config.service';
import { ParserConfigController } from './parser-config.controller';

@Module({
  controllers: [ParserConfigController],
  providers: [ParserConfigService],
})
export class ParserConfigModule {}
