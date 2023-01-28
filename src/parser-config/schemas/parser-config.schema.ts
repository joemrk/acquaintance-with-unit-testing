import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ParserStatus } from '../enum/parser-status.enum';

const REQUIRED_VALIDATE_MESS = 'Value is required.';
const MIN_MAX_VALIDATE_MESS = 'Value must be between 1 and 255 symbols.';

@Schema()
export class ParserConfig {
  @Prop({
    type: String,
    required: [true, REQUIRED_VALIDATE_MESS],
    min: [1, MIN_MAX_VALIDATE_MESS],
    max: [255, MIN_MAX_VALIDATE_MESS],
  })
  target: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  inChat: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  inChanel: boolean;

  @Prop({
    type: String,
    enum: ParserStatus,
    default: ParserStatus.HOLD,
  })
  status: ParserStatus;

  @Prop({
    type: Date,
    default: Date.now(),
    required: true,
  })
  createdAt: Date;

  @Prop({
    type: Date,
    default: Date.now(),
    required: true,
  })
  updatedAt: Date;
}

export type ParserConfigDocument = HydratedDocument<ParserConfig>;

export const ParserConfigSchema = SchemaFactory.createForClass(ParserConfig);
