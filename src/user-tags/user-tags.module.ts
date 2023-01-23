import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserTagsEntity } from './entities/user-tags.entity'
import { UserTagsResolver } from './user-tags.resolver'
import { UserTagsService } from './user-tags.service'

@Module({
    imports: [TypeOrmModule.forFeature([UserTagsEntity])],
    providers: [UserTagsService, UserTagsResolver],
    exports: [UserTagsService],
})
export class UserTagsModule {}
