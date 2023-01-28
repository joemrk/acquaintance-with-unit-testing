import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsNotEmptySpaceValidator implements ValidatorConstraintInterface {
  async validate(value: string): Promise<boolean> {
    return typeof value === 'string' && value.trim().length > 0;
  }

  defaultMessage(arg): string {
    return `${arg.property} is not be empty`;
  }
}

export function IsNotEmptySpace(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsNotEmpty',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsNotEmptySpaceValidator,
    });
  };
}
