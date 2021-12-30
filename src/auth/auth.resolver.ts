import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JwtAuthService } from './jwt.service';
import { UserAuthInput } from './dto/auth-user.input';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { UserToken } from './dto/auth-token.dto';
import { LoginUserInput } from '../user/dto/login-user.input';
import { ChangePassInput } from './dto/password.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/jwt-auth.guard';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly jwtService: JwtAuthService,
    private authService:AuthService) {}
  )

}
