import { Field, ObjectType } from 'type-graphql'
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity('federated_credential')
@ObjectType()
export class FederatedCredential {
    @Field({ nullable: true })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id?: string

    @Field({ nullable: false })
    @Column({ nullable: false })
    userId: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    provider: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    providerUserId: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    email: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    photoURL: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    phoneNumber: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    accessToken: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    refreshToken: string

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date
}
