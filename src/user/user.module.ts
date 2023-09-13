import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from 'src/auth/auth.service'
import { AuthModule } from 'src/auth/auth.module'
import { UserDeviceModule } from '../user-devices/user-devices.module'
import { UserTagsTypeVisibleModule } from 'src/user-tags-type-visible/user-tags-type-visible.module'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { ConfigService } from '@nestjs/config' // Import ConfigService
import { FederatedCredential } from './entities/federated-credential.entity'
import { UserProfileModule } from 'src/user-profile/user-profile.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([User, FederatedCredential]),
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('jwtSecret'), // Get JWT secret from ConfigService
                signOptions: {
                    expiresIn: configService.get<number>('jwtExpiresIn'), // Get JWT expiration from ConfigService
                },
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        UserDeviceModule,
        UserTagsTypeVisibleModule,
        UserProfileModule,
    ],
    providers: [UserResolver, UserService, AuthService],
    exports: [UserService],
})
export class UserModule {}
