import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn,Entity } from "typeorm"


@ObjectType()
@Entity('user')
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;
  @Field()
  @Column({ nullable: true, unique: true })
  email: string;
  @Field()
  @Column({ nullable: true, unique: true })
  phoneNumber: string;
  @Field()
  @Column()
  password: string;
}
