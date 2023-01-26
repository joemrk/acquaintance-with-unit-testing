import { Test, TestingModule } from '@nestjs/testing';
import { ParserConfigService } from './parser-config.service';

describe('ParserConfigService', () => {
  let service: ParserConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParserConfigService],
    }).compile();

    service = module.get<ParserConfigService>(ParserConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
