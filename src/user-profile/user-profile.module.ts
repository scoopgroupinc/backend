import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProfile } from "./entities/user-profile.entity";
import ProfileFiles from "./entities/profileFiles.entity";
import { UserProfileResolver } from "./user-profile.resolver";
import { UserProfileService } from "./user-profile.service";
import { PassportModule } from "@nestjs/passport";
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserProfile, ProfileFiles]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers:[UserProfileResolver],
  providers: [
    UserProfileResolver,
    UserProfileService,
    ConfigService,
  ],
  exports: [],
})
export class UserProfileModule {}