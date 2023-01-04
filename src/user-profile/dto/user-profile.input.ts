/* eslint-disable prettier/prettier */
import { InputType, Field, ID } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'
import { UserTagsTypeVisibleInput } from 'src/user-tags-type-visible/dto/create-user-tag-type-visible.input'

@InputType()
export class UserProfileInput {
    @Field(() => ID)
    userId: string

    @Field({ nullable: true })
    @IsOptional()
    createdAt?: string

    @Field({ nullable: true })
    @IsOptional()
    profilePhoto: string

    @Field({ nullable: true })
    @IsOptional()
    birthday?: string

    @Field({ nullable: true })
    @IsOptional()
    height?: string

    @Field({ nullable: true })
    @IsOptional()
    gender?: string

    @Field({ nullable: true })
    @IsOptional()
    locationId?: string

    @Field({ nullable: true })
    @IsOptional()
    jobTitle?: string

    @Field({ nullable: true })
    company: string

    @Field({ nullable: true })
    homeTown: string

    @Field({ nullable: true })
    school: string

    userTagsTypeVisibleInput: UserTagsTypeVisibleInput
}
