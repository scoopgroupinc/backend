import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import moment from 'moment'
import { BlockUserService } from 'src/blocked-users/blocked-users.service'
import { MatchesService } from 'src/matches/matches.service'
import { UserPreferenceService } from 'src/user-preference/user-preference.service'
import { UserProfileService } from 'src/user-profile/user-profile.service'
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
        private blockUserService: BlockUserService
    ) {}

    async getUserChoices(userId: string) {
        let choices = await this.userChoiceRepository.find({
            swiperId: userId,
            swiperChoice: swiper_choice.unknown,
        })
        /// optionally we can add choices where the swiperchoice is unknown
        //check if user has backlogs of unknowns first before generating the new choices
        if (!choices || choices.length < 5)
            choices = await this.genUserChoices(userId)

        const allChoices = []
        for (const choice of choices) {
            const user = await this.userService.findOneByID(choice.shownUserId)
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
        return allChoices.slice(0, 5)
    }

    async genUserChoices(userId: string) {
        const userpreference = await this.userPreferenceService.findOne(userId)
        let gender = ['male', 'female']
        if (userpreference.gender === ['male']) gender = ['female']
        if (userpreference.gender === ['female']) gender = ['male']
        const potentialMatches =
            await this.userPreferenceService.findManyByGender(gender)

        let allMatches
        for (const match of potentialMatches) {
            if (match.userId !== userId) {
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

                if (isMatch || isBlocked) continue

                await this.userChoiceRepository.create({
                    swiperId: userId,
                    shownUserId: match.userId,
                })

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
            if (shownUserChoice.swiperChoice === swiper_choice.yes) {
                return await this.matcheService.createMatch(
                    choice.swiperId,
                    choice.shownUserId
                )
            }
        }

        return 'saved'
    }
}
