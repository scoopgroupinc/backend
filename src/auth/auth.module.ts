import { GqlAuthGuard } from './guards/jwt-auth.guard'
import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/entities/user.entity'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { JwtStrategy } from './strategies/jwt.strategy'
import { ConfigService } from '@nestjs/config' // Import ConfigService
import { AppleService } from './apple/apple.service'
import { HttpModule } from '@nestjs/axios'
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh.strategy'

@Module({
    imports: [
        HttpModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'), // Get JWT secret from ConfigService
                signOptions: {
                    expiresIn: configService.get<number>('JWT_EXPIRES_IN'), // Get JWT expiration from ConfigService
                },
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([User]),
    ],
    providers: [
        AuthResolver,
        JwtStrategy,
        JwtRefreshTokenStrategy,
        GqlAuthGuard,
        AuthService,
        AppleService,
    ],
    exports: [
        AuthService,
        GqlAuthGuard,
        JwtStrategy,
        PassportModule,
        JwtRefreshTokenStrategy,
        AppleService,
    ],
})
export class AuthModule {}
