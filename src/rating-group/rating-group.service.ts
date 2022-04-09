/* eslint-disable prettier/prettier */
import {
    forwardRef,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
    SaveRatingInput,
    UpdateRatingInput,
} from '../rating/dto/save-rating.input'
import { Repository } from 'typeorm'
import { RatingGroupInput } from './dto/rating-group.input'
import { RatingGroup } from './entities/rating-group.entity'
import { RatingCommentService } from '../rating-comment/rating-comment.service'
import { RatingCommentInput } from '../rating-comment/dto/rating-comment.input'
import { RatingService } from '../rating/rating.service'
import { RatingInput } from '../rating/dto/rating.input'
import logger from '../utils/logger'

@Injectable()
export class RatingGroupService {
    constructor(
        @InjectRepository(RatingGroup)
        private ratingGroupRepository: Repository<RatingGroup>,
        @Inject(forwardRef(() => RatingService))
        private ratingService: RatingService,
        @Inject(forwardRef(() => RatingCommentService))
        private ratingCommentService: RatingCommentService
    ) {}

    async saveRatingGroup(saveRatingInput: SaveRatingInput): Promise<any> {
        try {
            const { raterId, contentId, type, startTime, endTime } =
                saveRatingInput
            // first check if rateriD and contentId already exist
            if (
                (await this.findRaterAndContent(raterId, contentId)).length !==
                0
            ) {
                return new HttpException(
                    'Content has already been rated by this user',
                    HttpStatus.NOT_ACCEPTABLE
                )
            }

            const comment: RatingCommentInput[] =
                await this.ratingCommentService.saveRatingComment(
                    saveRatingInput.comment
                )

            const taggedRatings = await this.assignFinalTagToRatings(
                saveRatingInput.ratingDetails
            )
            const ratingEntries = taggedRatings.map((ratings) => ({
                raterId,
                contentId: saveRatingInput.contentId,
                criteriaId: ratings.criteriaId,
                rating: ratings.rating,
                final: ratings?.final ?? false,
            }))

            const rates = await this.ratingService.saveRatings(ratingEntries)
            const ratingIds: string[] = await rates.map((rate) => rate.id)
            const commentIds: string[] = await comment.map(
                (comment) => comment.id
            )

            const ratingGroup: RatingGroupInput = {
                raterId,
                contentId,
                type,
                startTime,
                endTime,
                ratingIds,
                commentIds,
            }

            await this.ratingGroupRepository.save(ratingGroup)

            return true
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Something went wrong',
                HttpStatus.EXPECTATION_FAILED
            )
        }
    }

    async assignFinalTagToRatings(ratings) {
        const groups = ratings.reduce(
            (groups, item) => ({
                ...groups,
                [item.criteriaId]: [...(groups[item.criteriaId] || []), item],
            }),
            {}
        )

        const criteriaKeys = Object.keys(groups)
        const newRatings = []
        for (let i = 0; i < criteriaKeys.length; i++) {
            const lastIndex = groups[criteriaKeys[i]].length - 1
            groups[criteriaKeys[i]][lastIndex].final = true

            groups[criteriaKeys[i]].forEach((element) => {
                newRatings.push(element)
            })
        }

        return newRatings
    }

    async findRaterAndContent(
        raterId: string,
        contentId: string
    ): Promise<RatingGroupInput[]> {
        return await this.ratingGroupRepository.find({
            where: { raterId, contentId },
        })
    }

    async getRatingGroup(contentId: string): Promise<RatingGroupInput[]> {
        return await this.ratingGroupRepository.find({ contentId })
    }
}
