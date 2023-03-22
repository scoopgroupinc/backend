import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { lastValueFrom, map } from 'rxjs'
import { UserProfileService } from 'src/user-profile/user-profile.service'
import { UserTagsTypeVisibleService } from 'src/user-tags-type-visible/user-tags-type-visible.service'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'
import { GroupCodes } from './entities/group.entity'
import { UserGroupCodes } from './entities/userCodes.entity'
import * as moment from 'moment'

export class GroupCodesService {
    constructor(
        @InjectRepository(GroupCodes)
        private groupCodesRepository: Repository<GroupCodes>,
        @InjectRepository(UserGroupCodes)
        private userGroupCodesRepository: Repository<UserGroupCodes>,
        private userService: UserService,
        private httpService: HttpService,
        private userProfileService: UserProfileService
    ) {}

    async create(code: string) {
        const codeExits = await this.groupCodesRepository.findOne({ code })
        if (codeExits)
            throw new HttpException('code already exist', HttpStatus.CONFLICT)
        await this.groupCodesRepository.save({ code })
        return 'code created'
    }

    async verfiyCode(code: string) {
        const codeExits = await this.groupCodesRepository.findOne({
            code,
            active: true,
        })
        if (codeExits) return false
        return true
    }

    async joinGroup(code: string, userId: string) {
        const codeExits = await this.groupCodesRepository.findOne({
            code,
            active: true,
        })

        const result = await this.userGroupCodesRepository.findOne({ userId })

        if (!codeExits)
            throw new HttpException('Invalid code', HttpStatus.CONFLICT)
        if (result)
            throw new HttpException(
                'Code has been used by user already',
                HttpStatus.CONFLICT
            )
        await this.userGroupCodesRepository.save({
            userId,
            codeId: codeExits.id,
        })
        return 'success'
    }

    async getGroupMembers(userId: string) {
        const code = await this.userGroupCodesRepository.findOne({ userId })
        if (!code)
            throw new HttpException('no group for user', HttpStatus.NOT_FOUND)
        const results = await this.userGroupCodesRepository.find({
            codeId: code.codeId,
        })
        const userIds = results.map((res) => res.userId)
        const members = []
        for (const id of userIds) {
            if (id === userId) continue
            const user = await this.userService.findOneByID(id)
            if (!user) continue
            const visuals = await lastValueFrom(
                this.httpService.get(id).pipe(map((response) => response.data))
            )
            const profile = await this.userProfileService.findOne(id)
            const max = visuals.length
            const randomIndex = Math.floor(Math.random() * max)
            const selected = visuals[randomIndex]
            members.push({
                userId: id,
                name: `${user.firstName} ${user.lastName}`,
                gender: profile.gender,
                age: moment().diff(profile.birthday, 'years', false),
                visual: selected.videoOrPhoto,
            })
        }

        return members
    }
}
