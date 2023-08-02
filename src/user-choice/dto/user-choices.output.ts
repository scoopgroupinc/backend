import { Field, ObjectType } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'
import { UserPromptOutput } from 'src/user-prompts/dto/user-prompts.output'
import { UserTagsTypeVisibleEntity } from 'src/user-tags-type-visible/entities/user-tags-type-visible.entity'

@ObjectType()
export class IVisual {
    @Field(() => String)
    id: string

    @Field(() => String)
    userId: string

    @Field(() => String)
    videoOrPhoto: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    visualPromptId: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    description: string

    @Field(() => Boolean)
    isVisible: boolean
}
@ObjectType()
export class UserChoiceOutput {
    @Field(() => String)
    id?: string

    @Field(() => String)
    swiperId: string

    @Field(() => String)
    shownUserId: string

    @Field(() => String)
    swiperChoice: string

    @Field(() => String)
    age: string

    @Field(() => Date)
    createdAt: Date

    @Field(() => String)
    gender: string

    @Field(() => String)
    choiceName: string

    @Field(() => UserPromptOutput)
    prompt: UserPromptOutput

    @Field(() => [UserTagsTypeVisibleEntity])
    profile: UserTagsTypeVisibleEntity[]

    @Field(() => IVisual, { nullable: true })
    @IsOptional()
    visual?: IVisual
}
