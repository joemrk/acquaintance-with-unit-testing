import { IsId } from '../isId';

export class UrlParams {
  @IsId()
  id?: string;
}
