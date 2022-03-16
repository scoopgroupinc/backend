import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNumber, IsNotEmpty, IsMACAddress } from 'class-validator'

@InputType()
export class UserDeviceInput {
    @Field(() => ID)
    userId: string

    @Field(() => String, { nullable: true })
    createdAt?: string

    @Field(() => String, { nullable: true })
    @IsNotEmpty()
    osType?: string

    @Field(() => String, { nullable: true })
    @IsMACAddress()
    macAddress?: string

    @Field(() => String, { nullable: true })
    @IsNotEmpty()
    version?: string

    @Field(() => String, { nullable: true })
    // @IsNotEmpty()
    lastLogin?: string
}
