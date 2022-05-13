import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { UserPromptsInput } from './dto/user-prompts.input'
import { UserPrompts } from './entities/user-prompts.entity'
import { ConfigService } from '@nestjs/config'
import { lastValueFrom, map } from 'rxjs'
import { PromptsService } from 'src/prompts/prompts.service'
import { UserPromptsOrder } from './dto/user-prompts-order'

@Injectable()
export class UserPromptsService {
    constructor(
        @InjectRepository(UserPrompts)
        private userPromptsRepository: Repository<UserPrompts>,
        private httpService: HttpService,
        private configService: ConfigService,
        private promptService: PromptsService
    ) {}

    clientUrl = this.configService.get('fileServer_Url')

    async saveUserPrompt(userPromptsInput: UserPromptsInput): Promise<any> {
        try {
            return await this.userPromptsRepository.save(userPromptsInput)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getUserPromptsOrder(userId: string): Promise<any> {
        const userPromptIds = await lastValueFrom(
            this.httpService
                .get(this.clientUrl + userId)
                .pipe(map((response) => response.data))
        )
        if (!userPromptIds) {
            return []
        }

        const userDisplay = await this.userPromptsRepository
            .createQueryBuilder('userprompts')
            .where('userprompts.id IN (:...userPromptIds)', {
                userPromptIds,
            })
            .getMany()

        const results = userDisplay.map(async (display) => {
            return {
                ...display,
                prompt: await (
                    await this.promptService.findOne(display.promptId)
                ).prompt,
            }
        })
        return results
    }

    async saveUserPromptsOrder(userPromptsOrder: UserPromptsOrder) {
        return await lastValueFrom(
            this.httpService
                .post(this.clientUrl, { userPromptsOrder })
                .pipe(map((response) => response.data))
        )
    }

    async getAllUserPrompts(userId: string) {
        return await this.userPromptsRepository.find({ userId })
    }

    async findOne(id: string): Promise<UserPrompts> {
        return await this.userPromptsRepository.findOne({ id })
    }
}
