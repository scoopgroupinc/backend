import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocationEntity } from "./entities/location.entity";
import { LocationResolver } from "./location.resolver";
import { LocationService } from "./location.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    TypeOrmModule.forFeature([LocationEntity]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [LocationResolver, LocationService],
  exports: [],
})
export class LocationModule {}