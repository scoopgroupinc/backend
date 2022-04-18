import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LocationEntity } from './entities/location.entity'
import { LocationResolver } from './location.resolver'
import { LocationService } from './location.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthModule } from 'src/auth/auth.module'

@Module({
    imports: [TypeOrmModule.forFeature([LocationEntity]), AuthModule],
    providers: [LocationResolver, LocationService],
    exports: [],
})
export class LocationModule {}
