import { InputType, Field, ID, Float, } from '@nestjs/graphql';
import {
  IsObject,
  IsOptional,
  IsNotEmpty,
  IsString,
  IsDecimal,
  IsArray,
} from 'class-validator';
import { RatingCommentInput } from '../../rating-comment/dto/rating-comment.input';
import { RatingInput } from './rating.input';

@InputType()
class saveRatingDto {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  id?: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  criteriaId: string;

  @Field(() => Float)
  @IsNotEmpty()
  @IsDecimal()
  rating: number;
}

@InputType()
export class SaveRatingInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  raterId: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  contentId: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  type: string;

  @Field(() => [RatingCommentInput])
  @IsArray()
  @IsOptional()
  comment: RatingCommentInput[];

  @Field(() => [saveRatingDto])
  @IsArray()
  @IsNotEmpty()
  ratingDetails: saveRatingDto[];

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  startTime: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  endTime: string;
}

@InputType()
export class UpdateRatingInput {
  @Field(() => RatingCommentInput)
  @IsNotEmpty()
  comment: RatingCommentInput;

  @Field(() => [RatingInput])
  @IsNotEmpty()
  rating: RatingInput[];
}
