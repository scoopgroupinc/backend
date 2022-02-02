/* eslint-disable prettier/prettier */
import { InputType, Field, ID } from '@nestjs/graphql';
import {
  IsString,
  IsNumber,
  IsObject,
  IsBoolean,
  IsArray,
  IsEmpty,
  IsOptional,
} from 'class-validator';
import { Column } from 'typeorm';

@InputType()
export class UserProfileInput {
  @Field(() => ID)
  userId: string;

  @Field({ nullable: true })
  @IsOptional()
  createdAt?: string;

  @Field({ nullable: true })
  @IsOptional()
  profilePhoto: string;

  @Field({ nullable: true })
  @IsOptional()
  birthday?: string;

  @Field({ nullable: true })
  @IsOptional()
  height?: string;

  @Field({ nullable: true })
  @IsOptional()
  gender?: string;

  @Field({ nullable: true })
  @IsOptional()
  locationId?: string;

  @Field({ nullable: true })
  @IsOptional()
  jobTitle?: string;

  @Field({ nullable: true })
  @IsOptional()
  jobTitleVisible: boolean;

  @Field({ nullable: true })
  company: string;

  @Field({ nullable: true })
  companyVisible: boolean;

  @Field({ nullable: true })
  homeTown: string;

  @Field({ nullable: true })
  homeTownVisible: boolean;

  @Field({ nullable: true })
  school: string;

  @Field({ nullable: true })
  schoolVisible: boolean;

  @Field({ nullable: true })
  educationLevel: string;

  @Field({ nullable: true })
  educationLevelVisible: boolean;

  @Field(() => [String], { nullable: true })
  ethinicity: string[];

  @Field({ nullable: true })
  ethinicityVisible: boolean;

  @Field(() => [String], { nullable: true })
  sports: string[];

  @Field({ nullable: true })
  sportsVisible: boolean;

  @Field({ nullable: true })
  smoking?: string;

  @Field({ nullable: true })
  smokingVisible?: boolean;

  @Field({ nullable: true })
  cannabis?: string;

  @Field({ nullable: true })
  cannabisVisible?: boolean;

  @Field({ nullable: true })
  alcohol?: string;

  @Field({ nullable: true })
  alcoholVisible?: boolean;

  @Field({ nullable: true })
  drugs?: string;

  @Field({ nullable: true })
  drugsVisible?: boolean;

  @Field(() => [String], { nullable: true })
  diet?: string[];

  @Field({ nullable: true })
  dietVisible?: boolean;

  @Field({ nullable: true })
  languages?: string;

  @Field({ nullable: true })
  languagesVisible?: boolean;

  @Field(() => [String], { nullable: true })
  musicGenre?: string[];

  @Field({ nullable: true })
  musicGenreVisible?: boolean;

  @Field(() => [String], { nullable: true })
  creativeOulet?: string[];

  @Field({ nullable: true })
  creativeOuletVisible?: boolean;

  @Field(() => [String], { nullable: true })
  religions?: string[];

  @Field({ nullable: true })
  religionsVisible?: boolean;

  @Field(() => [String], { nullable: true })
  religiousPractice?: string[];

  @Field({ nullable: true })
  religiousPracticeVisible?: boolean;

  @Field({ nullable: true })
  zodiac?: string;

  @Field({ nullable: true })
  zodiacVisible?: boolean;

  @Field({ nullable: true })
  meyerBriggs?: string;

  @Field({ nullable: true })
  meyerBriggsVisible?: boolean;

  @Field(() => [String], { nullable: true })
  characteristics?: string[];

  @Field({ nullable: true })
  characteristicsVisible?: boolean;

  @Field({ nullable: true })
  politics?: string;

  @Field({ nullable: true })
  politicsVisible?: boolean;

  @Field({ nullable: true })
  parentingGoal?: string;

  @Field({ nullable: true })
  parentingGoalVisible?: boolean;

  @Field(() => [String], { nullable: true })
  relationshipGoals?: string[];

  @Field({ nullable: true })
  relationshipGoalsVisible?: boolean;

  @Field(() => [String], { nullable: true })
  relationshipTypes?: string[];

  @Field({ nullable: true })
  relationshipTypesVisible?: boolean;

  @Field(() => [String], { nullable: true })
  pets?: string[];

  @Field({ nullable: true })
  petsVisible?: boolean;
}
