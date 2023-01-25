/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Rating } from './entities/rating.entity'
import { Repository, In } from 'typeorm'
import { RatingInput } from './dto/rating.input'
import { SaveRatingInput } from './dto/save-rating.input'
import { RateCriteriasService } from 'src/rate-criterias/rate-criterias.service'
import { RatingGroupService } from '../rating-group/rating-group.service'
import { RatingCommentService } from 'src/rating-comment/rating-comment.service'
import { AverageOutput } from './dto/rating.output'
import { RatingCommentInput } from 'src/rating-comment/dto/rating-comment.input'
import logger from 'src/utils/logger'

@Injectable()
export class RatingService {
    constructor(
        @InjectRepository(Rating)
        private ratingRepository: Repository<Rating>,
        private rateCriteriaService: RateCriteriasService,
        private ratingGroupService: RatingGroupService,
        private ratingCommentService: RatingCommentService
    ) {}

    async saveRatingGroup(saveRatingInput: SaveRatingInput): Promise<any> {
        const response = await this.ratingGroupService.saveRatingGroup(
            saveRatingInput
        )
        if (response === true) return 'rating successfully saved'
        return response
    }

    async saveRatings(ratingInput: RatingInput[]): Promise<RatingInput[]> {
        const ratingEntries = await this.ratingRepository.create(ratingInput)
        return await this.ratingRepository.save(ratingEntries)
    }

    async getRatingByContent(contentId: string): Promise<any> {
        const details = await this.ratingRepository.find({
            where: { contentId, final: true },
        })

        if (details.length !== 0) {
            try {
                const allCritarias =
                    await this.rateCriteriaService.getAllCriterias()

                const newObject = []
                details.forEach(({ id, contentId, rating, criteriaId }) => {
                    const { title } = allCritarias.find(
                        (item) => item.id === criteriaId
                    )
                    const data = {
                        id,
                        contentId,
                        rating,
                        criteria: title,
                    }
                    newObject.push(data)
                })

                const newRating = await this.groupCriterias(newObject)
                const summary = await this.findAveragesOfGroupedCriterias(
                    newRating
                )
                return summary
            } catch (error) {
                logger.debug(error)
                throw new HttpException(
                    'Something went wrong. Try agian',
                    HttpStatus.BAD_REQUEST
                )
            }
        }

        throw new HttpException(
            'Content details not found',
            HttpStatus.NOT_FOUND
        )
    }

    async findAveragesOfGroupedCriterias(groupedData) {
        const rateKeys = Object.keys(groupedData)

        const results = []
        for (let i = 0; i < rateKeys.length; i++) {
            let total = 0
            groupedData[rateKeys[i]].forEach((item) => {
                total += parseFloat(item.rating)
            })

            results[rateKeys[i]] =
                Math.round((total / groupedData[rateKeys[i]].length) * 100) /
                100
        }

        return results
    }

    async groupCriterias(data) {
        const newRating = []
        data.forEach((rate) => {
            newRating[rate.criteria]
                ? newRating[rate.criteria].push({ rating: rate.rating })
                : ((newRating[rate.criteria] = []),
                  newRating[rate.criteria].push({ rating: rate.rating }))
        })

        return newRating
    }

    async getContentComments(contentId: string): Promise<RatingCommentInput[]> {
        const ratingGroup = await this.ratingGroupService.getRatingGroup(
            contentId
        )
        const allcommmentIds = []
        ratingGroup.forEach((group) => {
            allcommmentIds.push(group.id)
        })
        return await this.ratingCommentService.getRatingComment(allcommmentIds)
    }

    async getAverageRatings(
        raterId: string,
        criteriaId: string
    ): Promise<AverageOutput> {
        let ratings
        if (raterId && criteriaId) {
            ratings = await this.ratingRepository.find({
                where: { raterId, criteriaId, final: true },
            })
        }

        if (raterId === '' || (raterId === ' ' && criteriaId)) {
            ratings = await this.ratingRepository.find({
                where: { criteriaId, final: true },
            })
        }
        return await this.calculateRatingAverage(ratings)
    }

    async getRatings(ratingIds: string[]): Promise<any> {
        const ratings = await this.ratingRepository.find({ id: In(ratingIds) })
        return ratings
    }

    async calculateRatingAverage(ratings): Promise<AverageOutput> {
        let total = 0.0
        const count = ratings.length
        ratings.forEach((rates) => {
            total += parseFloat(rates.rating.toString())
        })
        const average = Math.round((total / count) * 100) / 100
        return { average, count }
    }

    async getRaterContent(raterId: string, contentIds:string[] ){
         const contents = await this.ratingRepository.find({contentId: In(contentIds), raterId})
         const results = []
         contentIds.forEach(contId=>{
            if(!(contents.find(item=> item.contentId===contId))) results.push(contId)
         })
         return results;
    }
}
