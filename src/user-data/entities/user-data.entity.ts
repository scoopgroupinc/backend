import { Field, ObjectType } from "@nestjs/graphql";
import { PrimaryColumn, Entity, Unique, BaseEntity, Column } from "typeorm";
import { IsNumber } from "class-validator";

export enum educationLevels{
    highSchool='high School',
    graduate='graduate',
    postGraduate='post graduate',
    notToSay = 'prefer not to say'
}

@Entity('user_data')
@ObjectType()
@Unique(['userId'])
export class UserData extends BaseEntity{
    @Field()
    @PrimaryColumn({type:'bigint'})
    userId:string;

    @Field()
    @Column({type:'date'})
    createdAt?:string;


    @Field({nullable:true})
    @Column({nullable:true})
    profilePhoto:string;
    
    @Field({nullable:true})
    @Column({nullable:true})
    birthday?:string;

    @Field({nullable:true})
    @IsNumber()
    @Column({nullable:true})
    height?: number

   
    @Field({nullable: true})   
    @Column({nullable:true}) 
    gender?:string;

    @Field({nullable:true})
    @Column({nullable:true})
    locationId?:number

    @Field({nullable:true})
    @Column({type:'enum',enum:educationLevels})
    educationLevel:string;

    @Field({nullable:true})
    @Column({array:true,default:[]})
    ethinicity:string[];

    @Field({nullable:true})
    @Column({array:true,default:[]})
    sports:string[]
}

