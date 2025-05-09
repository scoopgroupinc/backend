/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Rating } from './entities/rating.entity'
import { Repository, In } from 'typeorm'
import { IGetRatingInput, RatingInput } from './dto/rating.input'
import { SaveRatingInput } from './dto/save-rating.input'
import { RateCriteriasService } from 'src/rate-criterias/rate-criterias.service'
import { RatingGroupService } from '../rating-group/rating-group.service'
import { RatingCommentService } from 'src/rating-comment/rating-comment.service'
import { AverageOutput } from './dto/rating.output'
import { RatingCommentInput } from 'src/rating-comment/dto/rating-comment.input'
import logger from 'src/utils/logger'
import {groupBy, sumBy, countBy} from 'lodash'

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

    async getRatingByContent(ratingInput:IGetRatingInput[]): Promise<any> {
       const response =[]
       for(const input of ratingInput){
        const {contentId, type} = input
        const details = await this.ratingRepository.find({
            where: { contentId, type, final: true },
        })

        if(!Boolean(details.length)){
            response.push({
                contentId,
                type,
                total:0,
            })

            continue

        } 

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
                
                const counts = {}
                const breakPoints= ['0','0.33','0.66','0.99']
                for(const rate in newRating){
                    const someCrit= groupBy(newRating[rate],({rating})=>rating)
                    const accRa=[]
                    breakPoints.forEach(point=>{
                       const pnt= someCrit[point]?.length??0
                       accRa.push({[point]:pnt||0})
                    })
                    counts[rate]=accRa
                }
                const comments= await this.getContentComments(contentId);
                const well_written = summary['Well Written']
                const rateKeys = Object.keys(newRating)
                summary.total = newRating[rateKeys[0]].length
                response.push({...summary,well_written, contentId, type,comments, counts: JSON.stringify(counts)})
            } catch (error) {
                logger.debug(error)
                throw new HttpException(
                    'Something went wrong. Try agian',
                    HttpStatus.BAD_REQUEST
                )
            }
        }
      }

      return response

    }

    async findAveragesOfGroupedCriterias(groupedData) {
        const rateKeys = Object.keys(groupedData)

        const results:any = []
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
