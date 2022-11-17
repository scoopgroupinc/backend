import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BlockUserInput } from './dto/blocked-users.input'
import { BlockedUsers } from './entities/blocked-users.entity'

@Injectable()
export class BlockUserService {
    constructor(
        @InjectRepository(BlockedUsers)
        private blockedUserRepository: Repository<BlockedUsers>
    ) {}

    async blockUser(blockUserInput: BlockUserInput) {
        await this.blockedUserRepository.save(blockUserInput)
    }

    async findOne(blockUserInput: BlockUserInput) {
        const { blockedUserId, blockerId } = blockUserInput
        return await this.blockedUserRepository.findOne({
            blockedUserId,
            blockerId,
        })
    }

    async checkUserBlocked(userId: string, userIds: string[]) {
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
    }
}
