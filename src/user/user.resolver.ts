import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import {
  BadRequestException,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
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

    // return this.userService.create(createUserInput);
    const user = await this.userService.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    console.log("user",user)
    // const existingUser = await this.userService.findOne({ user.email});
    return user;
    
  }

  @Mutation(() => User)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    const { email, password, phoneNumber } = loginUserInput;

    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }
     const jwt = await this.jwtService.signAsync({ id: user.id });

     return {
       message: 'success',
       user,
       jwt,
     };
  }

  @Query(() => [User], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
