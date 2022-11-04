import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { lastValueFrom, map } from 'rxjs'
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm'
import { FeedBackFilter } from './dto/feedback.filter'
import { FeedBackInput } from './dto/feedback.input'
import { FeedBack } from './entities/feedback.entity'

const DATE_FORMAT = 'YYYY-MM-DD'

@Injectable()
export class FeedBackService {
    constructor(
        @InjectRepository(FeedBack)
        private feedbackRespository: Repository<FeedBack>,
        private httpService: HttpService
    ) {}

    async saveUserfeedback(feedbackInput: FeedBackInput) {
        try {
            await this.feedbackRespository.save(feedbackInput)
            return 'success'
        } catch (error) {
            console.log(error)
        }
    }

    async getFeedBacks(feedbackfilter: FeedBackFilter) {
        const {
            fromDate,
            toDate,
            page,
            deviceOS,
            appVersion,
            issue,
            userId,
            rating,
        } = feedbackfilter

        const query: {
            createdAt?: object
            deviceOS?: string
            appVersion?: string
            issue?: string
            userId?: string
            rating?: number
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
        if (deviceOS) query.deviceOS = deviceOS
        if (appVersion) query.appVersion = appVersion
        if (issue) query.issue = issue
        if (userId) query.userId = userId
        if (rating) query.rating = rating

        const results = await this.feedbackRespository.find({
            where: query,
            order: { createdAt: 'DESC' },
            skip: (page - 1) * 30,
            take: 30 * page,
        })

        for (const fbk of results) {
            if (fbk.image) {
                fbk.image = await lastValueFrom(
                    this.httpService
                        .get(fbk.image)
                        .pipe(map((response) => response.data))
                )
            }
        }

        return results
    }
}
