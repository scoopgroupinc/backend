import { HttpService } from '@nestjs/axios'
import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Not, Repository } from 'typeorm'
import { UserPromptsInput } from './dto/user-prompts.input'
import { UserPrompts } from './entities/user-prompts.entity'
import { ConfigService } from '@nestjs/config'
import { lastValueFrom, map } from 'rxjs'
import { PromptsService } from 'src/prompts/prompts.service'
import { UserPromptsOrder } from './dto/user-prompts-order'
import { UserPromptsOutput } from './dto/user-prompts.output'

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

    async saveUserPrompts(userPromptsInput: UserPromptsInput[]): Promise<any> {
        try {
            const results = []
            await Promise.all(
                userPromptsInput.map(async (userPrompt) => {
                    const existingUserPrompt =
                        await this.userPromptsRepository.findOne({
                            userId: userPrompt.userId,
                            promptId: userPrompt.promptId,
                        })
                    if (existingUserPrompt) {
                        existingUserPrompt.answer = userPrompt.answer
                        results.push(
                            await this.userPromptsRepository.save(
                                existingUserPrompt
                            )
                        )
                    } else {
                        results.push(
                            await this.userPromptsRepository.save(userPrompt)
                        )
                    }
                })
            )
            return results
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getUserPromptsOrder(userId: string): Promise<any> {
        const userPromptIds = await lastValueFrom(
            this.httpService.get(userId).pipe(map((response) => response.data))
        )
        console.log(userPromptIds)
        if (!userPromptIds || !userPromptIds.length) {
            return []
        }
        const userDisplay = await this.userPromptsRepository
            .createQueryBuilder('userprompts')
            .where('userprompts.id IN (:...userPromptIds)', {
                userPromptIds,
            })
            .getMany()
        console.log(userDisplay)
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

    async findOne(id: string): Promise<UserPrompts> {
        return await this.userPromptsRepository.findOne({ id })
    }
}
