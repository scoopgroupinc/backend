import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  import { User } from './entities/user.entity';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { UserService } from './user.service';
  
  @ValidatorConstraint({ async: true })
  export class IsEmailAlreadyExistConstraint
    implements ValidatorConstraintInterface
  {
    constructor(
      @InjectRepository(User) private userRepository: Repository<User>,
      private userService: UserService,
    ) {}

   async validate(email: string):Promise<boolean> {
      // return this.userRepository.findOne({ where: { email } }).then((user) => {
      //   if (user) return false;
      //   return true;
      // });
      const user = await this.userService.findByEmail(email);
       if (user) return false;
        return true;

    }
  }
  
  export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsEmailAlreadyExistConstraint,
      });
    };
  }