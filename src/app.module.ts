import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { ParserConfigModule } from './parser-config/parser-config.module';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    ParserConfigModule,
    MongooseModule.forRoot(process.env.DB_ATLAS_CONNECTION_STRING, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 5000,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
