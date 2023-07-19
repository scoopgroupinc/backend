import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BlockUserInput } from './dto/blocked-users.input'
import { BlockedUsers } from './entities/blocked-users.entity'
import logger from 'src/utils/logger'

@Injectable()
export class BlockUserService {
    constructor(
        @InjectRepository(BlockedUsers)
        private blockedUserRepository: Repository<BlockedUsers>
    ) {}

    async blockUser(blockUserInput: BlockUserInput) {
        try {
            await this.blockedUserRepository.save(blockUserInput)
        } catch (error) {
            logger.debug(error)
            throw error
        }
    }

    async findOne(blockUserInput: BlockUserInput) {
        try {
            const { blockedUserId, blockerId } = blockUserInput
            return await this.blockedUserRepository.findOne({
                blockedUserId,
                blockerId,
            })
        } catch (error) {
            logger.debug(error)
            throw error
        }
    }

    async checkUserBlocked(userId: string, userIds: string[]) {
        try {
            const result = []
            for (const id of userIds) {
                const isBlocked = await this.blockedUserRepository.find({
                    where: [
                        {
                            blockerId: userId,
                            blockedUserId: id,
                        },
                        {
                            blockerId: id,
                            blockedUserId: userId,
                        },
                    ],
                })

                if (isBlocked.length === 0) {
                    result.push({
                        userId: id,
                        blocked: false,
                    })
                }
            }
            return result
        } catch (error) {
            logger.debug(error)
            throw error
        }
    }
}
