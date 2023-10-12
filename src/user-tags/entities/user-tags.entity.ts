import { Field, ID, ObjectType } from '@nestjs/graphql'
import { UserTagsTypeVisibleEntity } from 'src/user-tags-type-visible/entities/user-tags-type-visible.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IsString, IsOptional } from 'class-validator'
// import { ApiProperty } from '@nestjs/swagger';

@ObjectType({
    description: 'Entity for user tags',
})
@Entity('user_tags')
export class UserTagsEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    // @ApiProperty({ type: String, description: 'The unique identifier of a user tag.' })
    id: string

    @Field(() => ID)
    @Column()
    @IsString()
    // @ApiProperty({ type: String, description: 'The unique identifier of a user.' })
    userId: string

    @Field(() => String)
    @Column()
    @IsString()
    // @ApiProperty({ type: String, description: 'The name of the tag.' })
    tagName: string

    @Field(() => String)
    @Column()
    @IsString()
    // @ApiProperty({ type: String, description: 'The type of the tag.' })
    tagType: string

    @Field(() => ID, { nullable: true })
    @Column({ type: 'bigint', nullable: true })
    @IsString()
    @IsOptional()
    // @ApiProperty({ type: String, description: 'The unique identifier of a tag.', nullable: true })
    tagId: string | null

    @Field(() => UserTagsTypeVisibleEntity)
    @ManyToOne(
        () => UserTagsTypeVisibleEntity,
        (UserTagsTypeVisibleEntity) => UserTagsTypeVisibleEntity.userTags
        // Consider cascade options if needed
    )
    userTagsTypeVisible: UserTagsTypeVisibleEntity
}
