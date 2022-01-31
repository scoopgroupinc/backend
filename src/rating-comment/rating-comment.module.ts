/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingComment } from './entities/rating-comment.entity';
import { RatingCommentService } from './rating-comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([RatingComment])],
  providers: [RatingCommentService],
  exports: [
    RatingCommentService,
  ],
})
export class RatingCommentModule {}
