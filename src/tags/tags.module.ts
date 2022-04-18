import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { TagsEntity } from './entities/tags.entity'
import { TagsResolver } from './tags.resolver'
import { TagsService } from './tags.service'

@Module({
    imports: [TypeOrmModule.forFeature([TagsEntity]), AuthModule],
    providers: [TagsResolver, TagsService],
    exports: [],
})
export class TagsModule {}
