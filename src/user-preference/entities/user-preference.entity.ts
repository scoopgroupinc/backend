import { Entity, Unique, BaseEntity, PrimaryColumn, Column } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";

export enum gender{
    male='male',
    female='female',
    bisexual ='bisexual'
}

@Entity('user_preference')
@ObjectType()
@Unique(['userId'])
export class UserPreference extends BaseEntity{

    @Field()
    @PrimaryColumn({type:'bigint'})
    userId:string;

    @Field({nullable:true})
    @Column({nullable:true})
    createdAt:string;

    @Field({nullable:true})    
    @Column({array:true,default:[]})
    heightRange:string[];

    
    @Field({nullable:true})    
    @Column({array:true,default:[]})
    ageRange:string[];

    @Field({nullable:true})    
    @Column({array:true,default:[], enum:gender})
    gender:string[];

    @Field({nullable:false})
    @Column({type:'number', default:30})
    distance:number;
    
    @Field({nullable:true})
    @Column({array:true,default:[]})
    ethnicityPreferences:string[];

    @Field({nullable:true})
    @Column({array:true,default:[]})
    sportsPreferences:string[];

    
}