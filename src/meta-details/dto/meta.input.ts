import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class MetaDetailsInput {
    @Field(() => String)
    @IsString()
    forceUpdateAndroid: string

    @Field(() => String)
    @IsString()
    forceUpdateIOS: string

    @Field(() => String)
    @IsString()
    updateAndroid: string

    @Field(() => String)
    @IsString()
    updateIOS: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    updateTitleAndroid: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    updateTitleIOS: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    updateButtonAndroid: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    updateButtonIOS: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    updateTextAndroid: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    updateTextIOS: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    closeUpdateButtonAndroid: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    closeUpdateButtonIOS: string
}
