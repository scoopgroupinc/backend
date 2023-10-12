import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { tag_type_visible } from 'src/common/enums'
import { UserTagsTypeVisibleInput } from 'src/user-tags-type-visible/dto/create-user-tag-type-visible.input'
import { Repository } from 'typeorm'
import { UserTagsEntity } from './entities/user-tags.entity'

@Injectable()
export class UserTagsService {
    constructor(
        @InjectRepository(UserTagsEntity)
        private userTagsRespository: Repository<UserTagsEntity>
    ) {}

    async saveUserTags(userTagsInput: UserTagsTypeVisibleInput) {
        try {
            // find tags that match userId and tagType and delete them
            const { userId, tagType, userTags } = userTagsInput
            const dbUserTags = await this.userTagsRespository.find({
                userId,
                tagType: tag_type_visible[tagType],
            })
            if (dbUserTags.length > 0) {
                await this.userTagsRespository.remove(dbUserTags)
            }

            // save new tags
            const userTagsToSave = userTags.map((tag) => {
                return {
                    userId,
                    tagType: tag_type_visible[tagType],
                    tagName: tag.tagName,
                    tagId: tag.tagId,
                }
            })

            return await this.userTagsRespository.save(userTagsToSave)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getUserTags(userId: string, tagType: string) {
        const dbUserTags = await this.userTagsRespository.find({
            userId,
            tagType,
        })
        return dbUserTags
    }
}
