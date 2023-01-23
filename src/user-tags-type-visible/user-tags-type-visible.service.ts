import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { tagEmoji, tag_type } from 'src/common/enums'
import { UserTagsService } from 'src/user-tags/user-tags.service'
import logger from 'src/utils/logger'
import { Repository } from 'typeorm'
import { UserTagsTypeVisibleInput } from './dto/create-user-tag-type-visible.input'
import { UserTagsTypeVisibleEnity } from './entities/user-tags-type-visible.entity'

@Injectable()
export class UserTagsTypeVisibleService {
    constructor(
        @InjectRepository(UserTagsTypeVisibleEnity)
        private userTagsTypeVisibleRepository: Repository<UserTagsTypeVisibleEnity>,
        private userTagsService: UserTagsService
    ) {}

    async saveUserTagsTypeVisible(input: UserTagsTypeVisibleInput[]) {
        try {
            for (const _i of input) {
                const { userId, tagType, visible } = _i
                const tagTypeFromInput = tag_type[tagType]
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
                        emoji: this.convertFromEmojiToHexa(
                            tagEmoji[tagTypeFromInput]
                        ),
                        tagType: tagTypeFromInput,
                    })
                } else {
                    // create new user tags type visible
                    const userTagsTypeVisibleToSave = {
                        userId,
                        tagType: tagTypeFromInput,
                        emoji: this.convertFromEmojiToHexa(
                            tagEmoji[tagTypeFromInput]
                        ),
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
        return await this.userTagsService.saveUserTags(input)
    }

    async allUserTagsTypeVisible(userId: string) {
        const results = await this.userTagsTypeVisibleRepository.find({
            userId,
        })

        if (results.length === 0)
            return new NotFoundException(
                `User with Id ${userId} has no tag types`
            )

        // convert emoji
        const modifiedOutput = results.map((result) => {
            return {
                ...result,
                emoji: this.convertFromHexaToEmoji(result.emoji),
            }
        })

        return modifiedOutput
    }

    convertFromEmojiToHexa(emoji) {
        return emoji.toString().codePointAt(0).toString(16)
    }

    convertFromHexaToEmoji(hex) {
        return String.fromCodePoint(parseInt('0x' + hex))
    }
}
