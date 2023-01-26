import { Test, TestingModule } from '@nestjs/testing';
import { ParserConfigController } from './parser-config.controller';
import { ParserConfigService } from './parser-config.service';

describe('ParserConfigController', () => {
  let controller: ParserConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParserConfigController],
      providers: [ParserConfigService],
    }).compile();

    controller = module.get<ParserConfigController>(ParserConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
