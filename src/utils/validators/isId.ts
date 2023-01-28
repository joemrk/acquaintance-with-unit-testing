import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ObjectID } from 'mongodb';

@ValidatorConstraint()
export class IsIdValidator implements ValidatorConstraintInterface {
  async validate(value: string): Promise<boolean> {
    return typeof value === 'string' && ObjectID.isValid(value);
  }

  defaultMessage(arg): string {
    return `${arg.property} is not valid id`;
  }
}

export function IsId(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsIdVa',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsIdValidator,
    });
  };
}
