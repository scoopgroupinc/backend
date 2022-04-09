import { UserModule } from './../user/user.module'
import { GqlAuthGuard } from './guards/jwt-auth.guard'
import { JwtStrategy } from './strategies/jwt.strategy'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { JwtAuthService } from './jwt.service'
import { AuthResolver } from './auth.resolver'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/entities/user.entity'
import { AuthService } from './auth.service'

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRATION },
        }),
        TypeOrmModule.forFeature([User]),
    ],
    providers: [
        AuthResolver,
        JwtAuthService,
        JwtStrategy,
        GqlAuthGuard,
        AuthService,
    ],
    exports: [
        AuthService,
        JwtAuthService,
        GqlAuthGuard,
        JwtStrategy,
        PassportModule,
    ],
})
export class AuthModule {}
