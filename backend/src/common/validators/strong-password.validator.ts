import {
   registerDecorator,
   ValidationOptions,
   ValidatorConstraint,
   ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class StrongPasswordConstraint implements ValidatorConstraintInterface {
   validate(password: string): boolean {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      return regex.test(password);
   }

   defaultMessage(): string {
      return 'A senha deve conter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e símbolos.';
   }
}

export function IsStrongPassword(validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
      registerDecorator({
         target: object.constructor,
         propertyName,
         options: validationOptions,
         constraints: [],
         validator: StrongPasswordConstraint,
      });
   };
}
