import { MailerService } from '@nestjs-modules/mailer'
import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { lastValueFrom, map } from 'rxjs'
import { UserProfileService } from 'src/user-profile/user-profile.service'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'
import { MatchesOutput } from './dto/matches.output'
import { Matches } from './entities/matches.entity'
import logger from 'src/utils/logger'

@Injectable()
export class MatchesService {
    constructor(
        @InjectRepository(Matches)
        private matchesRpository: Repository<Matches>,
        private userService: UserService,
        private userProfileService: UserProfileService,
        private mailerService: MailerService,
        private httpService: HttpService
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
            throw new HttpException(
                'No match found for user',
                HttpStatus.NOT_FOUND
            )

        const allMatches = []
        for (const match of userMatches) {
            let matchTo
            if (userId !== match.firstSwiper) {
                matchTo = await this.userService.findOneByID(match.firstSwiper)
            }

            if (userId !== match.secondSwiper) {
                matchTo = await this.userService.findOneByID(match.secondSwiper)
            }
            if (!matchTo) continue
            const profile = await this.userProfileService.findOne(
                matchTo.userId
            )
            const visuals = await lastValueFrom(
                this.httpService
                    .get(matchTo.userId)
                    .pipe(map((response) => response.data))
            )
            const max = visuals.length
            const randomIndex = Math.floor(Math.random() * max)
            const selected = visuals[randomIndex]
            const isFirstExist = allMatches.find(
                (itm) => itm.firstSwiper === matchTo.userId
            )
            const isSecondExist = allMatches.find(
                (itm) => itm.secondSwiper === matchTo.userId
            )
            if (!isFirstExist && !isSecondExist) {
                allMatches.push({
                    ...match,
                    userId,
                    matchUserId: matchTo.userId,
                    matchName: `${matchTo.firstName} ${matchTo.lastName}`,
                    gender: profile.gender,
                    age: moment().diff(profile.birthday, 'years', false),
                    visual: selected,
                })
            }
        }
        return allMatches
    }

    async deleteMatch(id: string) {
        try {
            await this.matchesRpository.update({ id }, { active: false })
            return 'saved'
        } catch (error) {
            logger.debug(error)
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
        await this.matchesRpository.save({
            firstSwiper,
            secondSwiper,
        })
        const userIds = [firstSwiper, secondSwiper]
        const year = moment().year()
        const swiper1 = await this.userService.findOneByID(firstSwiper)
        const swiper2 = await this.userService.findOneByID(secondSwiper)
        let pic1 = null
        let pic2 = null
        for (const id of userIds) {
            const matchName =
                id === swiper1.userId ? swiper2.firstName : swiper1.firstName
            const profilePic = await lastValueFrom(
                this.httpService
                    .get(
                        id === swiper1.userId ? swiper2.userId : swiper1.userId
                    )
                    .pipe(map((response) => response.data))
            )

            if (id === swiper1.userId) pic2 = profilePic[0]?.videoOrPhoto
            if (id === swiper2.userId) pic1 = profilePic[0]?.videoOrPhoto
            await this.mailerService.sendMail({
                to: id === swiper1.userId ? swiper1.email : swiper2.email,
                from: 'noreply@scoop.love',
                subject: 'Scoop Match Made ✔',
                text: 'Matched',
                template: 'matchNotification',
                context: {
                    year,
                    matchName,
                    profilePic: profilePic[0]?.videoOrPhoto,
                },
            })
        }
        //TODO: add user profile pic
        return {
            message: 'match created',
            user1: { ...swiper1, pic: pic1 },
            user2: { ...swiper2, pic: pic2 },
        }
    }
}
