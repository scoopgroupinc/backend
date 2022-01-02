
import { UpdateAuthInput } from './../auth/dto/update-auth.input';
import { Token } from 'graphql';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  PartialType,
} from '@nestjs/graphql';
import {
  BadRequestException,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserToken } from './entities/user-token.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const { firstName, lastName, email, password, phoneNumber } =
      createUserInput;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.userService.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    return user;
  }

  @Mutation(() => UserToken)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    const { email, password } = loginUserInput;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }

    const payload = {
      message: 'success',
      token: this.authService.generateJwt(user),
      user,
    };

    return payload;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'all_users' })
  findAll() {
    return this.userService.findAll();
  }
}
