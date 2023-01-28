import { CreateParserConfigDto } from './../../dto/create-parser-config.dto';

export const parserConfigStubs = (): CreateParserConfigDto[] => [
  {
    target: 'target_1',
    inChat: true,
    inChanel: false,
  },
  {
    target: 'target_2',
    inChat: true,
    inChanel: true,
  },
];
