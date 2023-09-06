import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { lastValueFrom, map } from 'rxjs'
import { BlockUserService } from 'src/blocked-users/blocked-users.service'
import { MatchesService } from 'src/matches/matches.service'
import { UserPreferenceService } from 'src/user-preference/user-preference.service'
import { UserProfileService } from 'src/user-profile/user-profile.service'
import { UserPromptsService } from 'src/user-prompts/user-prompts.service'
import { UserTagsTypeVisibleService } from 'src/user-tags-type-visible/user-tags-type-visible.service'
import { UserService } from 'src/user/user.service'
import { Between, Repository } from 'typeorm'
import { swiper_choice, UserChoice } from './entities/user-choice.entity'

@Injectable()
export class UserChoiceService {
    constructor(
        @InjectRepository(UserChoice)
        private userChoiceRepository: Repository<UserChoice>,
        private userPreferenceService: UserPreferenceService,
        private userProfileService: UserProfileService,
        private userService: UserService,
        private matcheService: MatchesService,
        private blockUserService: BlockUserService,
        private userPromptsService: UserPromptsService,
        private userTagsTypeVisibleService: UserTagsTypeVisibleService,
        private httpService: HttpService
    ) {}

    async getUserChoices(userId: string) {
        // handle fetching of user preference if they havent onboarded yet
        const userpreference = await this.userPreferenceService.findOne(userId)
        if (
            !userpreference ||
            !userpreference.gender ||
            userpreference.gender.length === 0
        )
            return null

        let choices = await this.userChoiceRepository.find({
            swiperId: userId,
            swiperChoice: swiper_choice.unknown,
            createdAt: Between(
                moment().utc().startOf('day').toISOString(),
                moment().utc().endOf('day').toISOString()
            ),
        })
        /// optionally we can add choices where the swiperchoice is unknown
        //check if user has backlogs of unknowns first before generating the new choices
        if (!choices || choices.length === 0 || choices.length < 5) {
            choices = await this.genUserChoices(userId)
        }

        if (Array.isArray(choices)) {
            const allChoices = []
            for (const choice of choices) {
                const user = await this.userService.findOneByID(
                    choice.shownUserId
                )
                if (user) {
                    const profile = await this.userProfileService.findOne(
                        choice.shownUserId
                    )
                    allChoices.push({
                        ...choice,
                        choiceName: `${user.firstName} ${user.lastName}`,
                        gender: profile.gender,
                        age: moment().diff(profile.birthday, 'years', false),
                    })
                }
            }
            let uniqueMatches = []
            allChoices.forEach((item) => {
                if (
                    !uniqueMatches.find(
                        (itm) => itm.shownUserId === item.shownUserId
                    )
                )
                    uniqueMatches.push(item)
            })
            if (uniqueMatches.length > 5)
                uniqueMatches = uniqueMatches.slice(0, 5)
            const response = []
            await Promise.all(
                uniqueMatches.map(async (match) => {
                    const visuals = await lastValueFrom(
                        this.httpService
                            .get(match.shownUserId)
                            .pipe(map((response) => response.data))
                    )
                    const max = visuals.length
                    const randomIndex = Math.floor(Math.random() * max)
                    const selected = visuals[randomIndex]
                    // TODO
                    // response.push({
                    //     ...match,
                    //     prompt: await this.userPromptsService.getUserPromptsOrder(
                    //         {
                    //             userId: match.shownUserId,
                    //             raterId: userId,
                    //         }
                    //     ),
                    //     profile:
                    //         await this.userTagsTypeVisibleService.allUserTagsTypeVisible(
                    //             match.shownUserId
                    //         ),
                    //     visual: selected,
                    // })
                })
            )

            return response
        }
        return null
    }

    async genUserChoices(userId: string) {
        const userpreference = await this.userPreferenceService.findOne(userId)

        let gender = []
        if (userpreference.gender.includes('female')) gender.push('male')
        if (userpreference.gender.includes('male')) gender.push('female')
        if (userpreference.gender.includes('bisexual'))
            gender = ['female', 'male']
        const potentialMatches =
            await this.userPreferenceService.findManyByGender(gender)

        let allMatches
        for (const match of potentialMatches) {
            if (match.userId !== userId) {
                const smUser = await this.userProfileService.findOne(
                    match.userId
                )
                if (
                    !userpreference.gender.includes(smUser.gender) &&
                    !userpreference.gender.includes('bisexual')
                )
                    continue
                //check if they've ever been matched from the matches table
                // if so conitue loop and skip this user
                const isMatch = await this.matcheService.checkForMatch(
                    userId,
                    match.userId
                )

                //check if match has been blocked by user
                const isBlocked = await this.blockUserService.findOne({
                    blockedUserId: match.userId,
                    blockerId: userId,
                })
                const isBlocker = await this.blockUserService.findOne({
                    blockedUserId: userId,
                    blockerId: match.userId,
                })

                if (isMatch || isBlocked || isBlocker) continue
                const createdAt = Between(
                    moment().utc().startOf('day').toISOString(),
                    moment().utc().endOf('day').toISOString()
                )
                const exits = await this.userChoiceRepository.find({
                    swiperId: userId,
                    shownUserId: match.userId,
                    createdAt,
                })
                if (!exits || !exits.length) {
                    await this.userChoiceRepository.save({
                        swiperId: userId,
                        shownUserId: match.userId,
                    })
                }

                allMatches = await this.userChoiceRepository.find({
                    where: {
                        swiperId: userId,
                        swiperChoice: swiper_choice.unknown,
                    },
                })

                if (allMatches.length === 5) break
            }
        }
        return allMatches
    }
    /***
     * what do we do when we are quering or the user choices and the firstwiper already swiped no
     */
    async userSwipeAction(id: string, swiperChoice: string) {
        await this.userChoiceRepository.update({ id }, { swiperChoice })

        if (swiperChoice === swiper_choice.yes) {
            const choice = await this.userChoiceRepository.findOne({
                id,
            })
            const shownUserChoice = await this.userChoiceRepository.findOne({
                where: [
                    {
                        swiperId: choice.shownUserId,
                        shownUserId: choice.swiperId,
                    },
                ],
                order: { id: 'DESC' },
            })
            // check if the other user also swiped yes then move
            // them to the matches table
            if (shownUserChoice?.swiperChoice === swiper_choice.yes) {
                return await this.matcheService.createMatch(
                    choice.swiperId,
                    choice.shownUserId
                )
            }
        }

        return { message: 'saved' }
    }
}
