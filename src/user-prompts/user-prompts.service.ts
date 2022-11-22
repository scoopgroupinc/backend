import { HttpService } from '@nestjs/axios'
import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common'
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

    async saveUserPrompt(userPromptsInput: UserPromptsInput): Promise<any> {
        try {
            return await this.userPromptsRepository.save(userPromptsInput)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getUserPromptsOrder(userId: string): Promise<any> {
        const userPromptIds = await lastValueFrom(
            this.httpService.get(userId).pipe(map((response) => response.data))
        )
        if (!userPromptIds || !userPromptIds.length) {
            return []
        }
        const userDisplay = await this.userPromptsRepository
            .createQueryBuilder('userprompts')
            .where('userprompts.id IN (:...userPromptIds)', {
                userPromptIds,
            })
            .getMany()
        const results = []
        await Promise.all(
            userDisplay.map(async (display) => {
                results.push({
                    ...display,
                    prompt: await (
                        await this.promptService.findOne(display.promptId)
                    ).prompt,
                })
            })
        )
        return results.sort(
            (a, b) => userPromptIds.indexOf(a.id) - userPromptIds.indexOf(b.id)
        )
    }

    async saveUserPromptsOrder(userPromptsOrder: UserPromptsOrder) {
        if (userPromptsOrder.userPromptIds.length > 6)
            return new BadRequestException('Select a maximum of six(6) prompts')
        return await lastValueFrom(
            this.httpService
                .post('', { userPromptsOrder })
                .pipe(map((response) => response.data))
        )
    }

    async getAllUserPrompts(userId: string) {
        const response = await this.userPromptsRepository.find({ userId })
        const results = []
        await Promise.all(
            response.map(async (pmpt) => {
                results.push({
                    ...pmpt,
                    prompt: await (
                        await this.promptService.findOne(pmpt.promptId)
                    ).prompt,
                })
            })
        )
        return results
    }

    async findOne(id: string): Promise<UserPrompts> {
        return await this.userPromptsRepository.findOne({ id })
    }
}
