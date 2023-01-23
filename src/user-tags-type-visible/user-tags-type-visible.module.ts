import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserTagsModule } from 'src/user-tags/user-tags.module'
import { UserTagsTypeVisibleEnity } from './entities/user-tags-type-visible.entity'
import { UserTagsTypeVisibleResolver } from './user-tags-type-visible.resolver'
import { UserTagsTypeVisibleService } from './user-tags-type-visible.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserTagsTypeVisibleEnity]),
        UserTagsModule,
    ],
    providers: [UserTagsTypeVisibleService, UserTagsTypeVisibleResolver],
    exports: [UserTagsTypeVisibleService],
})
export class UserTagsTypeVisibleModule {}
