import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from "typeorm"


@ObjectType()
export class User {
 @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Field()
    @Column()
    firstName: string
    @Field()
    @Column()
    lastName: string
    @Field()
    @Column()
    school: string
    @Field({ nullable: true })
    @Column({ nullable: true })
    city: string
  }
