import { Optional } from '@nestjs/common'
import { InputType, Field, ID } from '@nestjs/graphql'
import {
    MinLength,
    IsLatitude,
    IsNotEmpty,
    IsLongitude,
    IsOptional,
} from 'class-validator'

@InputType()
export class CreateLocationInput {
    @Field(() => ID)
    userId: string

    @Field(() => String, { nullable: true })
    @IsLatitude()
    latitude: string

    @Field(() => String, { nullable: true })
    @IsLongitude()
    longitude: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    addressLine1?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    addressLine2?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    stateProvince?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    country?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    city?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    zipPostal?: number
}
