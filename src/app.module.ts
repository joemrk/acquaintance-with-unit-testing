import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParserConfigModule } from './parser-config/parser-config.module';

@Module({
  imports: [ParserConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
