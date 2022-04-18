/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { RateCriterias } from './entities/rate-criterias.entity'
import { RateCriteriasResolver } from './rate-criterias.resolver'
import { RateCriteriasService } from './rate-criterias.service'

@Module({
    imports: [TypeOrmModule.forFeature([RateCriterias]), AuthModule],
    providers: [RateCriteriasService, RateCriteriasResolver],
    exports: [RateCriteriasService],
})
export class RateCriteriasModule {}
