
import { UpdateAuthInput } from './../auth/dto/update-auth.input';
import { Token } from 'graphql';
import {
  Resolver,
  Query,
  Mutation,
  Args, 
} from '@nestjs/graphql';
import {UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserToken } from './entities/user-token.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserInput } from './dto/user.input';

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

  @Mutation(()=>User)
  async updateUser(@Args('updateUserInput') updateUserInput:UpdateUserInput){
    return await this.userService.updateAccount(updateUserInput);
  }

  @Mutation(() => UserToken)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
   
    return await this.userService.login(loginUserInput);
  }
  
  @Mutation(()=>User)
  async activateAccount(@Args('code') code:number, @Args('email') email:string){
    return await this.userService.activateAccount(code,email);
  }

  @Mutation(()=>Boolean,{name:'resend_activation_code'})
  async resendCode(@Args('email') email:string){
    return await this.userService.resendActivationCode(email);
  }

  @Mutation(()=>Boolean)
  async forgotPassword(@Args('email')  email:string):Promise<Boolean>{
     return await this.userService.forgotPassword(email);
  }
   
  @Mutation(()=>Boolean)
  async verifyPasswordResetCode(@Args('email') email:string,
                                @Args('code') code:number){
     return await this.userService.verifyResetCode(email,code);
  }
  
  @Mutation(()=>User)
  async resetPassword(@Args('email') email:string,
                      @Args('password') password:string):Promise<any>{
     return await this.userService.resetPassword(email,password);
  }


}
