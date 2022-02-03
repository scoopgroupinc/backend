import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserPreference } from "./entities/user-preference.entity";
import { UserPreferenceResolver } from "./user-preference.resolver";
import { UserPreferenceService } from "./user-preference.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPreference]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UserPreferenceResolver, UserPreferenceService],
  exports: [],
})
export class UserPreferenceModule {}