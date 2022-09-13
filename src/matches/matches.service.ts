import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import moment from 'moment'
import { UserProfileService } from 'src/user-profile/user-profile.service'
import { UserService } from 'src/user/user.service'
import { Between, Repository } from 'typeorm'
import { MatchesOutput } from './dto/matches.output'
import { Matches } from './entities/matches.entity'

@Injectable()
export class MatchesService {
    constructor(
        @InjectRepository(Matches)
        private matchesRpository: Repository<Matches>,
        private userService: UserService,
        private userProfileService: UserProfileService
    ) {}

    async getUserMatches(userId: string): Promise<MatchesOutput[] | any> {
        const userMatches = await this.matchesRpository.find({
            where: [
                {
                    firstSwiper: userId,
                    active: true,
                },
                {
                    secondSwiper: userId,
                    active: true,
                },
            ],
        })
        if (!userMatches || userMatches.length === 0)
            return { userMatches, message: 'no match found for user' }

        const allMatches = []
        for (const match of userMatches) {
            let matchTo
            if (userId !== match.firstSwiper) {
                matchTo = await this.userService.findOneByID(match.firstSwiper)
            }

            if (userId !== match.firstSwiper) {
                matchTo = await this.userService.findOneByID(match.firstSwiper)
            }

            const profile = await this.userProfileService.findOne(
                matchTo.userId
            )
            allMatches.push({
                ...userMatches,
                userId,
                matchUserId: matchTo.userId,
                matchName: `${matchTo.firstName} ${matchTo.lastName}`,
                gender: profile.gender,
                age: moment().diff(profile.birthday, 'years', false),
            })
        }
        return allMatches
    }

    async deleteMatch(id: string) {
        try {
            await this.matchesRpository.update({ id }, { active: false })
            return 'saved'
        } catch (error) {
            console.log(error)
            throw new HttpException('something went wrong', HttpStatus.CONFLICT)
        }
    }

    async checkForMatch(userId: string, matchedUserId: string) {
        const isMatch = await this.matchesRpository.findOne({
            where: [
                { firstSwiper: userId, secondSwiper: matchedUserId },
                { firstSwiper: matchedUserId, secondSwiper: userId },
            ],
        })

        if (isMatch) return true
        return false
    }

    async createMatch(firstSwiper: string, secondSwiper: string) {
        await this.matchesRpository.create({
            firstSwiper,
            secondSwiper,
        })
        //TODO: notify users of match
        return 'match created'
    }
}
