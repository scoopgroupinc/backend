import { GqlAuthGuard } from './guards/jwt-auth.guard'
import * as configs from 'config'
import { JwtStrategy } from './strategies/jwt.strategy'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthResolver } from './auth.resolver'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/entities/user.entity'
import { AuthService } from './auth.service'
import { AppleAuthStrategy } from './strategies/apple.strategy'
import { AppleGuard } from './guards/apple-guard'
import { UserService } from 'src/user/user.service'

const { secret, expiresIn } = configs.get('jwt')

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: secret,
            signOptions: { expiresIn },
        }),
        TypeOrmModule.forFeature([User]),
    ],
    providers: [
        AuthResolver,
        JwtStrategy,
        GqlAuthGuard,
        AuthService,
        AppleGuard,
        AppleAuthStrategy,
    ],
    exports: [AuthService, GqlAuthGuard, JwtStrategy, PassportModule],
})
export class AuthModule {}
