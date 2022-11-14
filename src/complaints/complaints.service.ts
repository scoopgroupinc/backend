import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { lastValueFrom, map } from 'rxjs'
import { BlockUserService } from 'src/blocked-users/blocked-users.service'
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm'
import { ComplaintsFilter } from './dto/complaint.filter'
import { ComplaintsInput } from './dto/complaints.input'
import { ComplaintsOutput } from './dto/complaints.output'
import { Complaints, complaint_type } from './entities/complaints.entity'
import * as moment from 'moment'
import { MailerService } from '@nestjs-modules/mailer'
import { UserService } from 'src/user/user.service'

const DATE_FORMAT = 'YYYY-MM-DD'
@Injectable()
export class ComplaintsService {
    constructor(
        @InjectRepository(Complaints)
        private complaintsRepository: Repository<Complaints>,
        private httpService: HttpService,
        private blockedUserService: BlockUserService,
        private mailerService: MailerService,
        private userService: UserService
    ) {}

    async saveNewCompliants(complaintsInput: ComplaintsInput): Promise<string> {
        if (complaintsInput.type === complaint_type.block_user) {
            await this.blockedUserService.blockUser({
                blockedUserId: complaintsInput.accusedId,
                blockerId: complaintsInput.reporterId,
            })
        }
        await this.complaintsRepository.save(complaintsInput)

        if (complaintsInput.type === complaint_type.report_user)
            await this.warnReportedUser(complaintsInput.accusedId)
        return 'success'
    }

    async updateComplaint(complaintsInput: ComplaintsInput): Promise<string> {
        const { id } = complaintsInput
        const complaint = await this.findOne(id)
        if (!complaint)
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        await this.complaintsRepository.save({
            ...complaint,
            ...complaintsInput,
        })
        return 'updated'
    }

    async getAllOpenComplaints(
        complaintsFilter: ComplaintsFilter
    ): Promise<ComplaintsOutput[]> {
        const {
            page,
            accusedId,
            fromDate,
            toDate,
            isClosed,
            reporterId,
            type,
        } = complaintsFilter
        const query: {
            createdAt?: object
            accusedId?: string
            reporterId?: string
            type?: string
            isClosed?: boolean
        } = {}

        if (toDate && fromDate) {
            query.createdAt = Between(
                moment(fromDate).format(DATE_FORMAT),
                moment(toDate).format(DATE_FORMAT)
            )
        } else if (fromDate) {
            query.createdAt = MoreThanOrEqual(
                moment(fromDate).format(DATE_FORMAT)
            )
        } else if (toDate) {
            query.createdAt = LessThanOrEqual(
                moment(toDate).format(DATE_FORMAT)
            )
        }
        if (accusedId) query.accusedId = accusedId
        if (reporterId) query.reporterId = reporterId
        if (type) query.type = type
        if (isClosed) query.isClosed = isClosed
        const complaints = await this.complaintsRepository.find({
            where: query,
            order: { createdAt: 'DESC' },
            skip: (page - 1) * 30,
            take: 30 * page,
        })
        const response: ComplaintsOutput[] = []
        for (const comps of complaints) {
            if (comps?.media_file) {
                comps.media_file = await lastValueFrom(
                    this.httpService
                        .get(comps.media_file)
                        .pipe(map((response) => response.data))
                )
            }
            response.push(comps)
        }
        return response
    }

    async closeComplaint(complaintId: string): Promise<any> {
        const complaint = await this.findOne(complaintId)
        if (!complaint)
            throw new HttpException('complaint not found', HttpStatus.NOT_FOUND)
        await this.complaintsRepository.save({
            ...complaint,
            isClosed: true,
        })
        return 'complaint closed'
    }

    async findOne(id: string): Promise<ComplaintsOutput> {
        return await this.complaintsRepository.findOne({ id, isClosed: false })
    }

    async warnReportedUser(accusedId: string) {
        const results = await this.complaintsRepository
            .createQueryBuilder('user_complaints')
            .where('user_complaints.accusedId=:id', { id: accusedId })
            .distinctOn(['user_complaints.reporterId'])
            .getMany()

        if (results.length >= 3) {
            const { email } = await this.userService.findOneByID(accusedId)
            const year = moment().year()
            await this.mailerService.sendMail({
                to: email,
                from: 'noreply@scoop.love',
                subject: 'Scoop Warning ✔',
                text: 'Warning',
                template: 'activation',
                context: { warning: true, code: false, year },
            })
        }
    }
}
