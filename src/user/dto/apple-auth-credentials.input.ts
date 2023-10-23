import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'

// Enum declaration
export enum AppleAuthenticationUserDetectionStatus {
    UNSUPPORTED = 0,
    UNKNOWN = 1,
    LIKELY_REAL = 2,
}

registerEnumType(AppleAuthenticationUserDetectionStatus, {
    name: 'AppleAuthenticationUserDetectionStatus', // this one is mandatory, and must be unique in your entire schema
    description: 'The verification status of the real user', // this is optional
})

@InputType()
export class AppleAuthenticationFullName {
    @IsOptional()
    @Field(() => String, { nullable: true })
    familyName?: string

    @IsOptional()
    @Field(() => String, { nullable: true })
    givenName?: string

    @IsOptional()
    @Field(() => String, { nullable: true })
    middleName?: string

    @IsOptional()
    @Field(() => String, { nullable: true })
    namePrefix?: string

    @IsOptional()
    @Field(() => String, { nullable: true })
    nameSuffix?: string

    @IsOptional()
    @Field(() => String, { nullable: true })
    nickname?: string
}

@InputType()
export class AppleAuthCredentialsInput {
    @Field(() => String)
    authorizationCode: string

    @Field(() => String, { nullable: true })
    email?: string

    @Field(() => AppleAuthenticationFullName, { nullable: true })
    fullName?: AppleAuthenticationFullName

    @Field(() => String)
    identityToken: string

    @Field(() => Number)
    realUserStatus: number

    @Field(() => String, { nullable: true })
    state?: string

    @Field(() => String)
    user: string
}
