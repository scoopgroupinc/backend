import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { RatingService } from './rating.service'
import { SaveRatingInput } from './dto/save-rating.input'
import { AverageOutput, RatingOutput } from './dto/rating.output'
import { RatingCommentInput } from 'src/rating-comment/dto/rating-comment.input'
import { RatingComment } from 'src/rating-comment/entities/rating-comment.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { IGetRatingInput } from './dto/rating.input'

@Resolver()
export class RatingResolver {
    constructor(private ratingService: RatingService) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => String)
    async saveRatingGroup(
        @Args('ratingGroupInput') ratingGroupInput: SaveRatingInput
    ): Promise<any> {
        return await this.ratingService.saveRatingGroup(ratingGroupInput)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [RatingOutput], {
        description: 'Fetch rating for specific content',
    })
    async getRatingByContent(
        @Args({ name: 'ratingInput', type: () => [IGetRatingInput] })
        ratingInput: IGetRatingInput[]
    ): Promise<RatingOutput[]> {
        return await this.ratingService.getRatingByContent(ratingInput)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [RatingComment], {
        description: 'Fetch content comments by owner',
    })
    async getRatingContentComments(
        @Args('contentId') contentId: string
    ): Promise<RatingCommentInput[]> {
        return await this.ratingService.getContentComments(contentId)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => AverageOutput, {
        description: `Fetch average rating based on criteria id and/ or rater id. The first parameter 
       is the rater id and then the criteria id. Passing the rater id as an empty string  will return a result of the 
        average rating for the criteria id provided`,
    })
    async getAverageRatings(
        @Args('raterId') raterId: string,
        @Args('criteriaId') criteriaId: string
    ): Promise<any> {
        return await this.ratingService.getAverageRatings(raterId, criteriaId)
    }
}
