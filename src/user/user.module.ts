import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserDeviceModule } from '../user-devices/user-devices.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secret',
//       signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    UserDeviceModule
  ],
  providers: [UserResolver, UserService, AuthService],
  exports:[UserService]
})
export class UserModule {}
