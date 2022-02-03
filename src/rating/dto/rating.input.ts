import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsDecimal, IsEmpty } from 'class-validator';


@InputType()
export class RatingInput {
  @Field(() => ID)
  id?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  createdAt?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  contentId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  criteriaId: string;

  @Field(() => Float)
  @IsNotEmpty()
  @IsDecimal()
  rating: number;
}
