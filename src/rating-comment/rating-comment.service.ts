/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import logger from '../utils/logger'
import { In, Repository } from 'typeorm'
import { RatingCommentInput } from './dto/rating-comment.input'
import { RatingComment } from './entities/rating-comment.entity'

@Injectable()
export class RatingCommentService {
    constructor(
        @InjectRepository(RatingComment)
        private ratingCommentRepository: Repository<RatingComment>
    ) {}

    async saveRatingComment(
        ratingCommentInput: RatingCommentInput[]
    ): Promise<RatingCommentInput[]> {
        const lastIndex = ratingCommentInput.length - 1
        ratingCommentInput[lastIndex].final = true
        const ratingCommentEntries = await this.ratingCommentRepository.create(
            ratingCommentInput
        )
        return await this.ratingCommentRepository.save(ratingCommentEntries)
    }

    async getRatingComment(ratingGroupIds: string[]): Promise<any> {
        try {
            // const id = commentIds.pop();
            const comments = await this.ratingCommentRepository.find({
                ratingGroupId: In(ratingGroupIds),
            })
            return comments
        } catch (error) {
            logger.debug(error)
            return new HttpException(
                'Something went wrong',
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async updateRatingComment(commentUpdate: RatingCommentInput): Promise<any> {
        const { id } = commentUpdate

        const comment = await this.getRatingComment([id])
        if (!comment) return await this.saveRatingComment([comment])

        return await this.ratingCommentRepository.save({
            ...commentUpdate,
            ...comment,
        })
    }
}
