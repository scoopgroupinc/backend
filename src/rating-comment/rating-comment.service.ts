import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RatingCommentInput } from './dto/rating-comment.input';
import { RatingComment } from './entities/rating-comment.entity';

@Injectable()
export class RatingCommentService {
  constructor(
    @InjectRepository(RatingComment)
    private ratingCommentRepositry: Repository<RatingComment>,
  ) { }

  async saveRatingComment(
    ratingCommentInput: RatingCommentInput[],
  ): Promise<RatingCommentInput[]> {
    const lastIndex = RatingCommentInput.length - 1;
    RatingCommentInput[lastIndex].final = true;
    const ratingCommentEntries = await this.ratingCommentRepositry.create(
      ratingCommentInput,
    );
    return await this.ratingCommentRepositry.save(ratingCommentEntries);
  }

  async getRatingComment(commentIds: string[]): Promise<any> {
    try {
      // const id = commentIds.pop();
      const comments = await this.ratingCommentRepositry.find({
        id: In(commentIds),
      });
      return comments;
    } catch (error) {
      console.log(error);
      return new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }

  async updateRatingComment(commentUpdate: RatingCommentInput): Promise<any> {
    const { id } = commentUpdate;

    const comment = await this.getRatingComment([id]);
    if (!comment) return await this.saveRatingComment([comment]);

    return await this.ratingCommentRepositry.save({
      ...commentUpdate,
      ...comment,
    });
  }
}
