import { Module } from '@nestjs/common'
import * as configs from 'config'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from 'src/auth/auth.service'
import { AuthModule } from 'src/auth/auth.module'
import { UserDeviceModule } from '../user-devices/user-devices.module'
import { UserTagsTypeVisibleModule } from 'src/user-tags-type-visible/user-tags-type-visible.module'
import { UserAuthProvider } from './entities/userAuthProvider.entity'

const { secret, expiresIn } = configs.get('jwt')

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserAuthProvider]),
        JwtModule.register({
            secret: secret,
            signOptions: { expiresIn },
        }),
        AuthModule,
        UserDeviceModule,
        UserTagsTypeVisibleModule,
    ],
    providers: [UserResolver, UserService, AuthService],
    exports: [UserService],
})
export class UserModule {}
