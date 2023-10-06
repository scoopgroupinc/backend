import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { tag_type_visible, tags_visible } from 'src/common/enums'
import { UserTagsService } from 'src/user-tags/user-tags.service'
import logger from 'src/utils/logger'
import { Repository } from 'typeorm'
import { UserTagsTypeVisibleInput } from './dto/create-user-tag-type-visible.input'
import { UserTagsTypeVisibleEntity } from './entities/user-tags-type-visible.entity'

@Injectable()
export class UserTagsTypeVisibleService {
    constructor(
        @InjectRepository(UserTagsTypeVisibleEntity)
        private userTagsTypeVisibleRepository: Repository<UserTagsTypeVisibleEntity>,
        private userTagsService: UserTagsService
    ) {}

    async saveUserTagsTypeVisible(input: UserTagsTypeVisibleInput[]) {
        try {
            for (const _i of input) {
                const { userId, tagType, visible } = _i
                const tagTypeFromInput = tag_type_visible[tagType]
                const dbUserTags =
                    await this.userTagsTypeVisibleRepository.findOne({
                        userId,
                        tagType: tagTypeFromInput,
                    })
                if (dbUserTags) {
                    // update existing user tags type visible
                    await this.userTagsTypeVisibleRepository.save({
                        ...dbUserTags,
                        visible,
                        tagType: tagTypeFromInput,
                    })
                } else {
                    // create new user tags type visible
                    const userTagsTypeVisibleToSave = {
                        userId,
                        tagType: tagTypeFromInput,
                    }
                    await this.userTagsTypeVisibleRepository.save(
                        userTagsTypeVisibleToSave
                    )
                }
                await Promise.all(
                    input.map((input) => {
                        return this.saveOneUserTagsTypeVisible(input)
                    })
                )
            }
            return input
        } catch (error) {
            logger.debug(error)
            return error
        }
    }

    async saveOneUserTagsTypeVisible(input: UserTagsTypeVisibleInput) {
        try {
            return await this.userTagsService.saveUserTags(input)
        } catch (error) {
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async allUserTagsTypeVisible(userId: string) {
        console.log('user tags userId', userId)
        try {
            const results = await this.userTagsTypeVisibleRepository.find({
                userId,
            })

            if (results.length === 0)
                return new NotFoundException(
                    `User with Id ${userId} has no tag types`
                )

            return results
        } catch (error) {
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async prePopulateUserTags(userId: any) {
        try {
            console.log('prePopulateUserTags userId', userId)

            // Check if the user tags have already been populated for the given user ID
            const existingUserTags =
                await this.userTagsTypeVisibleRepository.find({
                    userId,
                })

            if (existingUserTags && existingUserTags.length > 0) {
                throw new HttpException(
                    'User tags already populated',
                    HttpStatus.FORBIDDEN
                )
            }

            const userTagsTypeVisible = tags_visible.map((tag) => ({
                userId,
                visible: true,
                tagType: tag_type_visible[tag],
                userTags: [],
            }))
            console.log('userTagsTypeVisible', userTagsTypeVisible)

            return this.saveUserTagsTypeVisible(userTagsTypeVisible)
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Failed to pre-populate user tags',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}
