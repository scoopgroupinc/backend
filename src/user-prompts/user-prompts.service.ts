import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserPromptsInput } from './dto/user-prompts.input'
import { UserPrompts } from './entities/user-prompts.entity'
import { IGetPromptOrder } from './dto/user-prompts-order'
import { RatingService } from 'src/rating/rating.service'
import { UserProfileService } from 'src/user-profile/user-profile.service'
import { UserPromptsOrderInput } from 'src/user-profile/dto/user-prompts-order.input'

@Injectable()
export class UserPromptsService {
    constructor(
        @InjectRepository(UserPrompts)
        private userPromptsRepository: Repository<UserPrompts>,
        private ratingeService: RatingService,
        private userProfileService: UserProfileService
    ) {}

    async saveUserPrompt(userPromptsInput: UserPromptsInput): Promise<any> {
        try {
            return await this.userPromptsRepository.save(userPromptsInput)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async saveUserPromptsOrder({
        userId,
        promptIds,
    }: UserPromptsOrderInput): Promise<any> {
        try {
            const userPrompts = {}
            const ids = []
            await Promise.all(
                promptIds.map(async (promptId) => {
                    const prompt = await this.userPromptsRepository.findOne({
                        userId,
                        promptId,
                    })
                    if (prompt) {
                        ids.push(prompt.promptId)
                        userPrompts[prompt.promptId] = prompt
                    }
                })
            )
            await this.userProfileService.saveUserPromptsOrder({
                userId,
                promptIds: ids,
            })
            return {
                userPrompts,
                promptIds: ids,
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    // saves a new prompt, so that history of changes are all kept
    async saveUserPrompts(userPromptsInput: UserPromptsInput[]): Promise<any> {
        try {
            const userPrompts = {}
            const promptIds = []
            await Promise.all(
                userPromptsInput.map(async (userPrompt) => {
                    promptIds.push(userPrompt.promptId)
                    userPrompts[userPrompt.promptId] = userPrompt
                    const existingUserPrompt =
                        await this.userPromptsRepository.findOne({
                            userId: userPrompt.userId,
                            promptId: userPrompt.promptId,
                        })
                    if (
                        !existingUserPrompt ||
                        existingUserPrompt?.answer.toLowerCase() !==
                            userPrompt?.answer.toLowerCase()
                    ) {
                        await this.userPromptsRepository.save(userPrompt)
                    }
                })
            )
            await this.userProfileService.saveUserPromptsOrder({
                userId: userPromptsInput[0].userId,
                promptIds,
            })

            return {
                userPrompts,
                promptIds,
            }
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getUserPromptsOrder({
        userId,
        raterId,
    }: IGetPromptOrder): Promise<any> {
        // const userPromptIds = await lastValueFrom(
        //     this.httpService.get(userId).pipe(map((response) => response.data))
        // )

        const userPromptIds = await this.userProfileService.getUserPromptsOrder(
            userId
        )
        if (!userPromptIds || !userPromptIds.length) {
            return []
        }

        // if (raterId) {
        //     /*make request to check if contents have been rated before and
        //       return random unrated prompt by user
        //     */
        //     return await this.getRaterContent(raterId, userPromptIds, results)
        // }
        // return results.sort(
        //     (a, b) => userPromptIds.indexOf(a.id) - userPromptIds.indexOf(b.id)
        // )
    }

    async getUserPrompts(userId: string) {
        if (userId) {
            try {
                const userPromptIds =
                    await this.userProfileService.getUserPromptsOrder(userId)
                const results = {}
                await Promise.all(
                    userPromptIds.map(async (promptId) => {
                        try {
                            const userPrompt = await this.userPromptsRepository
                                .createQueryBuilder('userprompts')
                                .where('userprompts.userId = :userId', {
                                    userId,
                                })
                                .andWhere('userprompts.promptId = :promptId', {
                                    promptId,
                                })
                                .orderBy('userprompts.createdAt', 'DESC')
                                .take(1)
                                .getOne()
                            results[promptId] = userPrompt
                        } catch (error) {
                            // Handle specific error for fetching user prompt by promptId
                        }
                    })
                )
                return {
                    userPrompts: results,
                    promptIds: userPromptIds,
                }
            } catch (error) {
                // Handle error for fetching user prompt ids
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
            }
        }
    }

    async findOne(id: string): Promise<UserPrompts> {
        return await this.userPromptsRepository.findOne({ id })
    }

    async getRaterContent(raterId: string, contentIds: string[], prompts) {
        const unRatedContents = await this.ratingeService.getRaterContent(
            raterId,
            contentIds
        )
        const max = unRatedContents.length - 1
        const randomIndex = Math.floor(Math.random() * max)
        const selectedId = unRatedContents[randomIndex]

        return prompts.find((prompt) => prompt.id === selectedId)
    }
}
