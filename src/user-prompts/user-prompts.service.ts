import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { UserPromptsInput } from './dto/user-prompts.input'
import { UserPrompts } from './entities/user-prompts.entity'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UserPromptsService {
    constructor(
        @InjectRepository(UserPrompts)
        private userPromptsRepository: Repository<UserPrompts>,
        private httpService: HttpService,
        private configService: ConfigService
    ) {}

    clientUrl = this.configService.get('fileServer_Url')

    async saveUserPrompt(userPromptsInput: UserPromptsInput): Promise<any> {
        try {
            const createdAt = new Date().toISOString().toString()
            userPromptsInput.createdAt = createdAt
            return await this.userPromptsRepository.save(userPromptsInput)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getUserPrompts(userId: string): Promise<UserPrompts[]> {
        try {
            const userPromptIds = await this.httpService.get(
                this.clientUrl + userId
            )
            if (!userPromptIds) {
                throw new HttpException(
                    'user has no selected display',
                    HttpStatus.NOT_FOUND
                )
            }

            const userDisplay = await this.userPromptsRepository
                .createQueryBuilder('userprompts')
                .where('promptId IN (:...userPromptIds)', {
                    promptId: userPromptIds,
                })
                .orderBy('createdAt', 'DESC')
                .groupBy('promptId')
                .getMany()
            const results = []
            userDisplay.forEach((display) => {
                results.push(display[0])
            })
            return results
        } catch (error) {
            throw new HttpException(
                'something went wrong',
                HttpStatus.EXPECTATION_FAILED
            )
        }
    }

    async findOne(id: string): Promise<UserPrompts> {
        return await this.userPromptsRepository.findOne({ id })
    }
}
