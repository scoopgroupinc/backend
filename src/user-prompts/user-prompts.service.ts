import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IUserPromptsFindLatest, IUserPrompt } from './dto/user-prompts.input'
import { UserPrompts } from './entities/user-prompts.entity'
import { IGetPromptOrder } from './dto/user-prompts-order'
import { RatingService } from 'src/rating/rating.service'
import { UserProfileService } from 'src/user-profile/user-profile.service'
import { IUserPromptsOrder } from 'src/user-profile/dto/user-prompts-order.input'

@Injectable()
export class UserPromptsService {
    constructor(
        @InjectRepository(UserPrompts)
        private userPromptsRepository: Repository<UserPrompts>,
        private ratingeService: RatingService,
        private userProfileService: UserProfileService
    ) {}

    async handleSaveUserPrompt(userPromptsInput: IUserPrompt): Promise<any> {
        try {
            const existingUserPrompt = await this.findLatestPrompt(
                userPromptsInput
            )
            if (
                !existingUserPrompt ||
                existingUserPrompt?.answer.toLowerCase() !==
                    userPromptsInput?.answer.toLowerCase()
            ) {
                return await this.userPromptsRepository.save(userPromptsInput)
            }
            return userPromptsInput
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async findLatestPrompt({
        userId,
        promptId,
    }: IUserPromptsFindLatest): Promise<any> {
        try {
            return await this.userPromptsRepository
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
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async saveUserPromptsOrder({
        userId,
        promptIds,
    }: IUserPromptsOrder): Promise<any> {
        try {
            const userPrompts = {}
            const ids = []
            // checks that the user has answered the prompt before saving the order
            await Promise.all(
                promptIds.map(async (promptId) => {
                    const prompt = await this.findLatestPrompt({
                        userId,
                        promptId,
                    })
                    if (prompt) {
                        ids.push(prompt.promptId)
                        userPrompts[prompt.promptId] = prompt
                    }
                })
            )

            // saves the order of the prompts that exist
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
    async saveUserPrompts(userPromptsInput: IUserPrompt[]): Promise<any> {
        try {
            const userPrompts = {}
            const promptIds = []
            await Promise.all(
                userPromptsInput.map(async (userPrompt) => {
                    promptIds.push(userPrompt.promptId)
                    userPrompts[userPrompt.promptId] = userPrompt
                    await this.handleSaveUserPrompt(userPrompt)
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

        return userPromptIds

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

    async getAllUserPromptsData(userId: string): Promise<any> {
        try {
            const userPrompts = await this.getUserAnsweredPrompts(userId)
            const userPromptIds =
                await this.userProfileService.getUserPromptsOrder(userId)
            return {
                userPrompts,
                promptIds: userPromptIds,
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getUserAnsweredPrompts(userId: string) {
        try {
            const promptIds = await this.userProfileService.getUserPromptsOrder(
                userId
            )
            const answered = await this.userPromptsRepository
                .createQueryBuilder('userprompts')
                .where('userprompts.userId = :userId', { userId })
                .andWhere(
                    (qb) =>
                        `userprompts.createdAt = 
                    (SELECT MAX(p.createdAt) FROM userprompts p WHERE p.userId = :userId AND p.promptId = userprompts.promptId)`
                )
                .getMany()
            const results = {}
            answered.forEach((userPrompt) => {
                results[userPrompt.promptId] = userPrompt
            })
            return {
                userPrompts: results,
                promptIds,
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getUserPromptsDisplayed(userId: string) {
        if (userId) {
            try {
                const userPromptIds =
                    await this.userProfileService.getUserPromptsOrder(userId)
                const results = {}
                await Promise.all(
                    userPromptIds.map(async (promptId) => {
                        try {
                            const userPrompt = await this.findLatestPrompt({
                                userId,
                                promptId,
                            })
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
