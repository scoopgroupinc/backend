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

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('jwtSecret'), // Get JWT secret from ConfigService
                signOptions: {
                    expiresIn: configService.get<number>('jwtExpiresIn'), // Get JWT expiration from ConfigService
                },
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([User]),
    ],
    providers: [AuthResolver, JwtStrategy, GqlAuthGuard, AuthService],
    exports: [AuthService, GqlAuthGuard, JwtStrategy, PassportModule],
})
export class AuthModule {}
