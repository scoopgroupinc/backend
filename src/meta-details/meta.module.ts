import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MetaDetails } from './entities/meta.entity'
import { MetaDetailsResolver } from './meta.resolver'
import { MetaDetailsService } from './meta.service'

@Module({
    imports: [TypeOrmModule.forFeature([MetaDetails])],
    providers: [MetaDetailsResolver, MetaDetailsService],
    exports: [],
})
export class MetaDetailsModule {}
