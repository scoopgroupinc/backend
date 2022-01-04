import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@ValidatorConstraint({ async: true })
export class IsPhoneAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  validate(phoneNumber: string) {
    return User.findOne({ where: { phoneNumber } }).then((user) => {
      if (user) return false;
      return true;
    });
  }
}

export function IsPhonelAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPhoneAlreadyExistConstraint,
    });
  };
}
