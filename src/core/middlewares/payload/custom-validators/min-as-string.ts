import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsMinString(min: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isMinString',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [min],
      options: { message: `${propertyName} tiene que ser mayor a ${min}` },
      validator: {
        validate(value: any, args: ValidationArguments) {
          const minConstraint = args.constraints[0];
          const relatedValue = Number.parseInt(value);
          return relatedValue > minConstraint;
        }
      }
    });
  };
}
