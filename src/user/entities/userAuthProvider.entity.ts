import { Field } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user_auth_provider')
export class UserAuthProvider {
    @Field({ nullable: false })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field({ nullable: false })
    @Column({ nullable: false })
    userId: string

    @Field({
        nullable: false,
        description: 'unique ID from of the user from the provider',
    })
    @Column({ nullable: false })
    providerUserId: string

    @Field({ nullable: false })
    @Column({ nullable: false })
    providerName: string
}
