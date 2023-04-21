import { Field, ObjectType } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'

// @ObjectType()
// export class IGroupDetails {
//     @Field(() => [IGroupDetails])
//     group: IGroupDetails[]
// }

@ObjectType()
export class IGroupMembers {
    @Field(() => String)
    groupId: string

    @Field(() => String)
    groupName?: string

    @Field(() => String)
    groupCode?: string

    @Field(() => [IGroupUser])
    members?: IGroupUser[]
}

@ObjectType()
export class IGroupUser {
    @Field(() => String)
    userId: string

    @Field(() => String)
    name: string

    @Field(() => String)
    gender: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    visual: string

    // @Field(() => String, { nullable: true })
    // @IsOptional()
    // age: string
}
