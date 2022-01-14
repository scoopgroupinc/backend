import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, BaseEntity } from 'typeorm';
import { Field, ObjectType,ID, InputType } from '@nestjs/graphql';


@Entity('profileFiles')
@ObjectType()
class ProfileFiles extends BaseEntity{

  @Field(() => ID)
  @PrimaryColumn({ type: 'bigint' })
  userId: string;

  @Field(() => String, { nullable: true })
  @Column()
  url: string;

  @Field(() => String, { nullable: true })
  @Column()
   key: string;
}

export default ProfileFiles;
