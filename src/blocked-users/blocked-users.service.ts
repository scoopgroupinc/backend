import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BlockUserInput } from './dto/bocked-users.input'
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
}
