import { InputType, ID, Field } from '@nestjs/graphql';
import { MaxLength, IsDecimal, IsBoolean, IsString } from 'class-validator';
import { tagType } from '../entities/tags.entity';

@InputType()
export class TagsInput {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    @MaxLength(30)
    name: string;

    @Field(() => String)
    type: tagType;

    @Field(() => Number)
    @IsDecimal()
    order: number;

    @Field()
    @IsBoolean()
    visible: boolean;

    @Field(() => String)
    @IsString()
    emoji: string;
}
