import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDevice } from './entities/user-devices.entity';
import { UserDeviceResolver } from './user-devices.resolver';
import { UserDeviceService } from './user-devices.service';
import { JwtAuthService } from '../auth/jwt.service';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDevice]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UserDeviceResolver, UserDeviceService],
  exports: [UserDeviceService],
})
export class UserDeviceModule {}
