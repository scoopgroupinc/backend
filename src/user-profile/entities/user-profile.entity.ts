
import { Field, ObjectType, ID, InputType } from "@nestjs/graphql";
import {
  PrimaryColumn,
  Entity,
  Unique,
  BaseEntity,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import ProfileFiles from './profileFiles.entity';

import { IsNumber } from "class-validator";

export enum educationLevels{
    highSchool='high School',
    graduate='graduate',
    postGraduate='post graduate',
    notToSay = 'prefer not to say'
}

export enum gender{
    male='male',
    female='female'
}

@Entity('user_profile')
@ObjectType()
@Unique(['userId'])
export class UserProfile extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn({ type: 'bigint' })
  userId: string;

  @Field(() => String)
  @Column({ type: 'date' })
  createdAt?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  profilePhoto: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  birthday?: string;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @Column({ nullable: true })
  height?: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'enum', enum: gender })
  gender?: string;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  locationId?: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  jobTitle?: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ default: true, type: 'boolean' })
  jobTitleVisible?: Boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  company?: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', default: true })
  companyVisible?: Boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  homeTown?: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', default: true })
  homeTownVisible?: Boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  school?: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', default: true })
  schoolVisible?: Boolean;

  @Field(() => String, { nullable: true })
  @Column({ type: 'enum', enum: educationLevels })
  educationLevel?: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', default: true })
  educationLevelVisible?: Boolean;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true, default: [] })
  ethinicity?: string[];

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', default: true })
  ethinicityVisible?: Boolean;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true, default: [] })
  sports?: string[];

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', default: true })
  sportsVisible?: Boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  smoking?: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', default: true })
  smokingVisible?: Boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  cannabis?: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', default: true })
  cannabisVisible?: Boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  alcohol?: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', default: true })
  alcoholVisible?: Boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  drugs?: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', default: true })
  drugsVisible?: Boolean;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true, default: [] })
  diet?: string[];

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', default: true })
  dietVisible?: Boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  languages?: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', default: true })
  languagesVisible?: Boolean;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true, default: [] })
  musicGenre?: string[];

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', default: true })
  musicGenreVisible?: Boolean;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true, default: [] })
  creativeOulet?: string[];

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', default: true })
  creativeOuletVisible?: Boolean;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true, default: [] })
  religions?: string[];

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', default: true })
  religionsVisible?: Boolean;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true, default: [] })
  religiousPractice?: string[];

  @Field(() => String, { nullable: true })
  @Column({ type: 'boolean', default: true })
  religiousPracticeVisible?: Boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  zodiac?: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', default: true })
  zodiacVisible?: Boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  meyerBriggs?: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', default: true })
  meyerBriggsVisible?: Boolean;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true, default: [] })
  characteristics?: string[];

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', default: true })
  characteristicsVisible?: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  politics?: string;

  @Field({ nullable: true })
  @Column({ type: 'boolean', default: true })
  politicsVisible?: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  parentingGoal?: string;

  @Field({ nullable: true })
  @Column({ type: 'boolean', default: true })
  parentingGoalVisible?: Boolean;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true, default: [] })
  relationshipGoals?: string[];

  @Field({ nullable: true })
  @Column({ type: 'boolean', default: true })
  relationshipGoalsVisible?: Boolean;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true, default: [] })
  relationshipTypes?: string[];

  @Field({ nullable: true })
  @Column({ type: 'boolean', default: true })
  relationshipTypesVisible?: Boolean;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true, default: [] })
  pets?: string[];

  @Field({ nullable: true })
  @Column({ type: 'boolean', default: true })
  petsVisible?: Boolean;
}

