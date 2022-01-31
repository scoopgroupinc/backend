import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { RatingService } from './rating.service';
import { SaveRatingInput } from './dto/save-rating.input';
import { AverageOutput, RatingOutput } from './dto/rating.output';
import { RatingCommentInput } from 'src/rating-comment/dto/rating-comment.input';
import { RatingComment } from 'src/rating-comment/entities/rating-comment.entity';

@Resolver()
export class RatingResolver {
  constructor(private ratingService: RatingService) { }

  @Mutation(() => String)
  async saveRatingGroup(
    @Args('ratingGroupInput') ratingGroupInput: SaveRatingInput,
  ): Promise<any> {
    return await this.ratingService.saveRatingGroup(ratingGroupInput);
  }

  @Query(() => RatingOutput, {
    description: 'Fetch rating details by owner',
  })
  async getRatingByOwner(@Args('contentId') contentId: string): Promise<any> {
    return await this.ratingService.getRatingByOwner(contentId);
  }

  @Query(() => [RatingComment], {
    description: 'Fetch content comments by owner',
  })
  async getRatingContentComments(
    @Args('contentId') contentId: string,
  ): Promise<RatingCommentInput[]> {
    return await this.ratingService.getContentComments(contentId);
  }

  @Query(() => AverageOutput, {
    description: `Fetch average rating based on criteria id and/ or rater id. The first parameter 
       is the rater id and then the criteria id. Passing the rater id as an empty string  will return a result of the 
        average rating for the criteria id provided`,
  })
  async getAverageRatings(
    @Args('raterId') raterId: string,
    @Args('criteriaId') criteriaId: string,
  ): Promise<any> {
    return await this.ratingService.getAverageRatings(raterId, criteriaId);
  }
}
