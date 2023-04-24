import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { lastValueFrom, map } from 'rxjs'
import { UserProfileService } from 'src/user-profile/user-profile.service'
import { UserTagsTypeVisibleService } from 'src/user-tags-type-visible/user-tags-type-visible.service'
import { UserService } from 'src/user/user.service'
import { In, Repository } from 'typeorm'
import { GroupCodes } from './entities/group.entity'
import { UserGroupCodes } from './entities/userCodes.entity'
import * as moment from 'moment'
import { groupBy } from 'lodash'

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

    async create(code: string, name: string) {
        const codeExits = await this.groupCodesRepository.findOne({ code })
        if (codeExits)
            throw new HttpException('code already exist', HttpStatus.CONFLICT)
        await this.groupCodesRepository.save({ code, name })
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
        if (!codeExits)
            throw new HttpException('Invalid code', HttpStatus.CONFLICT)

        const result = await this.userGroupCodesRepository.findOne({
            userId,
            codeId: codeExits.id,
        })

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
        const codes = await this.userGroupCodesRepository.find({ userId })
        if (!codes?.length)
            throw new HttpException('no group for user', HttpStatus.NOT_FOUND)
        const codeGroups = codes.map((cod) => cod.codeId)

        const results = await this.userGroupCodesRepository.find({
            codeId: In(codeGroups),
        })
        const groupByCode = groupBy(results, ({ codeId }) => codeId)
        // console.log(groupByCode)
        const groupKeys = Object.keys(groupByCode)
        const members = []
        for (const id of groupKeys) {
            const codeDetails = await await this.groupCodesRepository.findOne({
                id,
            })
            const allusers = []
            for (const grp of groupByCode[id]) {
                const user = await this.userService.findOneByID(grp.userId)
                if (!user) continue
                const visuals = await lastValueFrom(
                    this.httpService
                        .get(grp.userId)
                        .pipe(map((response) => response.data))
                )
                const profile = await this.userProfileService.findOne(id)
                const max = visuals.length
                const randomIndex = Math.floor(Math.random() * max)
                const selected = visuals[randomIndex]
                allusers.push({
                    userId: id,
                    name: `${user?.firstName} ${user?.lastName}`,
                    gender: profile?.gender,
                    age: moment().diff(profile?.birthday, 'years', false),
                    visual: selected?.videoOrPhoto,
                })
            }
            members.push({
                groupName: codeDetails.name,
                groupId: id,
                groupCode: codeDetails.code,
                members: allusers,
            })
        }
        return members
    }
}
