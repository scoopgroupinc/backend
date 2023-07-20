import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {
    UserPromptInputsFindLatest,
    UserPromptInput,
} from './dto/user-prompts.input'
import { UserPrompts } from './entities/user-prompts.entity'
import { RatingService } from 'src/rating/rating.service'
import { UserProfileService } from 'src/user-profile/user-profile.service'
import { UserPromptsOrderInput } from 'src/user-profile/dto/user-prompts-order.input'
import { GetUserPromptsOutput } from './dto/user-prompts.output'
import logger from 'src/utils/logger'

@Injectable()
export class UserPromptsService {
    constructor(
        @InjectRepository(UserPrompts)
        private userPromptsRepository: Repository<UserPrompts>,
        private ratingeService: RatingService,
        private userProfileService: UserProfileService
    ) {}

    async handleSaveUserPrompt(userPromptInput: UserPromptInput): Promise<any> {
        console.log('handleSaveUserPrompt', userPromptInput)
        try {
            const existingUserPrompt = await this.findLatestPrompt(
                userPromptInput
            )

            if (
                !existingUserPrompt ||
                existingUserPrompt?.answer !== userPromptInput?.answer
            ) {
                console.log('save', userPromptInput)
                return await this.userPromptsRepository.save(userPromptInput)
            }
            return userPromptInput
        } catch (error) {
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async findLatestPrompt({
        userId,
        promptId,
    }: UserPromptInputsFindLatest): Promise<any> {
        console.log('findLatestPrompt', userId, promptId)

        try {
            return await this.userPromptsRepository
                .createQueryBuilder('user_prompts')
                .where('user_prompts.userId = :userId', {
                    userId,
                })
                .andWhere('user_prompts.promptId = :promptId', {
                    promptId,
                })
                .orderBy('user_prompts.createdAt', 'DESC')
                .take(1)
                .getOne()
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async saveUserPromptsOrder({
        userId,
        promptIds,
    }: UserPromptsOrderInput): Promise<GetUserPromptsOutput> {
        console.log('saveUserPromptsOrder', userId, promptIds)
        try {
            const userPrompts = []
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
                        userPrompts.push(prompt)
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
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    // saves a new prompt, so that history of changes are all kept
    async saveUserPrompts(
        userPromptsInput: UserPromptInput[]
    ): Promise<GetUserPromptsOutput> {
        console.log('saveUserPrompts', userPromptsInput)
        try {
            const userPrompts = []
            const promptIds = []
            await Promise.all(
                userPromptsInput.map(async (userPrompt) => {
                    promptIds.push(userPrompt.promptId)
                    const saved = await this.handleSaveUserPrompt(userPrompt)
                    userPrompts.push(saved)
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
            console.log('error', error)
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getUserPromptsOrder(userId: string): Promise<any> {
        console.log('getUserPromptsOrder', userId)
        // const userPromptIds = await lastValueFrom(
        //     this.httpService.get(userId).pipe(map((response) => response.data))
        // )

        const userPromptIds = await (
            await this.userProfileService.findOne(userId)
        ).promptIds
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

    async getUserAnsweredPrompts(userId: string): Promise<any> {
        try {
            const userPrompts = await this.getUserAnsweredPromptsArray(userId)
            const promptIds = await (
                await this.userProfileService.findOne(userId)
            ).promptIds
            console.log('getUserAnsweredPrompts', userPrompts)
            console.log('getUserAnsweredPrompts', promptIds)
            return {
                userPrompts,
                promptIds,
            }
        } catch (error) {
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getUserAnsweredPromptsArray(userId: string): Promise<any> {
        console.log('getUserAnsweredPrompts', userId)

        try {
            const subQuery = this.userPromptsRepository
                .createQueryBuilder('up_sub')
                .select('up_sub.promptId', 'promptId')
                .addSelect('MAX(up_sub.createdAt)', 'maxCreatedAt')
                .where('up_sub.userId = :userId', { userId })
                .groupBy('up_sub.promptId')
                .getQuery()

            const userPrompts = await this.userPromptsRepository
                .createQueryBuilder('user_prompts')
                .where(
                    `(user_prompts.promptId, user_prompts.createdAt) IN (${subQuery})`
                )
                .andWhere('user_prompts.userId = :userId', { userId })
                .getMany()

            return userPrompts
        } catch (error) {
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getUserPromptsDisplayed(userId: string): Promise<any> {
        console.log('getUserPromptsDisplayed', userId)
        if (userId) {
            try {
                const user = await this.userProfileService.findOne(userId)
                const userPromptIds = user.promptIds
                const userPrompts = []
                await Promise.all(
                    userPromptIds.map(async (promptId) => {
                        try {
                            const prompt = await this.findLatestPrompt({
                                userId,
                                promptId,
                            })
                            userPrompts.push(prompt)
                        } catch (error) {
                            logger.debug(error)
                            // Handle specific error for fetching user prompt by promptId
                        }
                    })
                )
                return {
                    userPrompts,
                    promptIds: userPromptIds,
                }
            } catch (error) {
                // Handle error for fetching user prompt ids
                logger.debug(error)
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
