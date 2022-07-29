/* eslint-disable prettier/prettier */
import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    BaseEntity,
    Unique,
    CreateDateColumn,
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { ObjectType, Field } from '@nestjs/graphql'

@Entity('user')
@ObjectType()
@Unique(['email', 'phoneNumber'])
export class User extends BaseEntity {
    @Field({ nullable: true })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    userId?: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    firstName: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    lastName: string

    @Field({ nullable: true })
    @Column({ nullable: false, unique: true })
    email: string

    @Field({ nullable: true })
    @Column({ nullable: true, unique: true })
    phoneNumber: string

    @Field({ nullable: true })
    @Column({ nullable: false })
    password: string

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date

    @Field({ nullable: true })
    @Column({ nullable: true })
    salt: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    code: number

    @Field({ nullable: true })
    @Column({ default: false, nullable: false })
    isVerified: boolean

    @Field({ nullable: true })
    @Column({ nullable: true })
    resetCode: number

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash == this.password
    }
}
