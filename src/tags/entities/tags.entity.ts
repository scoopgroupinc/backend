import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";

export enum tagType{
   physical_activity='physical_activity',
   zodiac='zodiac',
   education='education',
   religion='religion'
}

@Entity('tags')
@ObjectType()
export class TagsEntity extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn({type:'bigint'})
    id:string;

    @Field()
    @Column()
    name:string;

    @Field()
    @Column({type:'string',enum:tagType})
    type:tagType;

    @Field()
    @Column({type:'decimal'})
    order:number;

    @Field()
    @Column({type:'boolean'})
    visible:Boolean;

    @Field()
    @Column({type:'string'})
    emoji:string;

}