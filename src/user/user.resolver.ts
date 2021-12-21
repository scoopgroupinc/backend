import { Resolver, Query, Mutation, Args, Int, PartialType } from '@nestjs/graphql';
import {
  BadRequestException,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserToken} from './entities/user-token.entity';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
// import {AuthPayload } from '../dto/schema';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    console.log('user input', createUserInput);
    const { fullName, email, password, phoneNumber } = createUserInput;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.userService.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    console.log('user', user);
    return user;
  }

  @Mutation(() => UserToken)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    const { email, password, phoneNumber } = loginUserInput;
    console.log('loginUserInput data', loginUserInput);

    const user = await this.userService.findOne({ email });
    console.log('user data', user);

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }
    
    const userPayload = {
      email: user.email,
      phoneNumber: user.phoneNumber,
      id: user.id,
    };
  
    const payload = {
      message: 'success',
      token: this.jwtService.sign(userPayload),
      user,
    };
    console.log('xxx', payload);

    return payload;
  }

  @Query(() => [User], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.userService.findOne(id);
  // }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.userService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.userService.remove(id);
  // }
}
