import { Token } from 'graphql';
import {
  Resolver,
  Query,
  Mutation,
  Args,
 
} from '@nestjs/graphql';
import {
 
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserToken } from './entities/user-token.schema';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from '../auth/auth.service';
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
     return await this.userService.create(createUserInput);
  }

  @Mutation(() => UserToken)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
   
    return await this.userService.login(loginUserInput);
  }
  
  @Mutation(()=>User)
  async activateAccount(@Args('code') code:number, @Args('email') email:string){
    return await this.userService.activateAccount(code,email);
  }

  
  async resendCode(@Args('email') email:string){
    return await this.resendCode(email);
  }

  async forgotPassword(@Args('email')  email:string){
     
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'all_users' })
  findAll() {
    return this.userService.findAll();
  }


}
