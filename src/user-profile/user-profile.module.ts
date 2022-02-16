import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProfile } from "./entities/user-profile.entity";
import { UserProfileResolver } from "./user-profile.resolver";
import { UserProfileService } from "./user-profile.service";
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserProfile]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UserProfileResolver, UserProfileService],
  exports: [],
})
export class UserProfileModule { }
