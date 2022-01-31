import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

@InputType()
export class RatingGroupInput {
  @Field(() => ID)
  id?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  raterId: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  type: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  contentId: string;

  @Field(() => [String], { nullable: true })
  @IsNotEmpty()
  @IsString()
  ratingIds: string[];

  @Field(() => [String], { nullable: true })
  @IsNotEmpty()
  @IsString()
  commentIds: string[];

  @Field()
  @IsOptional()
  @IsString()
  startTime?: string;

  @Field()
  @IsOptional()
  @IsString()
  endTime?: string;
}
