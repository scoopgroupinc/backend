import { Field, ObjectType } from "@nestjs/graphql";
import { PrimaryColumn, Entity, Unique, BaseEntity, Column } from "typeorm";
import { IsNumber } from "class-validator";

export enum educationLevels{
    highSchool='high School',
    graduate='graduate',
    postGraduate='post graduate',
    notToSay = 'prefer not to say'
}

export enum gender{
    male='male',
    female='female'
}

@Entity('user_profile')
@ObjectType()
@Unique(['userId'])
export class UserProfile extends BaseEntity{
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
    @Column({type:'enum',enum:gender}) 
    gender?:string;

    @Field({nullable:true})
    @Column({nullable:true})
    locationId?:number
    
    @Field({nullable:true})
    @Column({nullable:true})
    jobTitle?:string;

    @Field({nullable:true})
    @Column({default:true,type:'boolean'})
    jobTitleVisible?:Boolean;

    @Field({nullable:true})
    @Column({nullable:true})
    company?:string;

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    companyVisible?:Boolean;

    @Field({nullable:true})
    @Column({nullable:true})
    homeTown?:string;

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    homeTownVisible?:Boolean;

    @Field({nullable:true})
    @Column({nullable:true})
    school?:string;

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    schoolVisible?:Boolean;

    @Field({nullable:true})
    @Column({type:'enum',enum:educationLevels})
    educationLevel?:string;

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    educationLevelVisible?:Boolean;

    @Field({nullable:true})
    @Column({array:true,default:[]})
    ethinicity?:string[];

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    ethinicityVisible?:Boolean;

    @Field({nullable:true})
    @Column({array:true,default:[]})
    sports?:string[]

    
    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    sportsVisible?:Boolean;

    @Field({nullable:true})
    @Column({nullable:true})
    smoking?:string;

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    smokingVisible?:Boolean;

    @Field({nullable:true})
    @Column({nullable:true})
    cannabis?:string;

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    cannabisVisible?:Boolean;

    @Field({nullable:true})
    @Column({nullable:true})
    alcohol?:string;

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    alcoholVisible?:Boolean;

    @Field({nullable:true})
    @Column({nullable:true})
    drugs?:string;

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    drugsVisible?:Boolean;

    @Field({nullable:true})
    @Column({array:true,default:[]})
    diet?:string[];

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    dietVisible?:Boolean;

    @Field({nullable:true})
    @Column({nullable:true})
    languages?:string;

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    languagesVisible?:Boolean;

    @Field({nullable:true})
    @Column({array:true,default:[]})
    musicGenre?:string[];

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    musicGenreVisible?:Boolean;

    @Field({nullable:true})
    @Column({array:true,default:[]})
    creativeOulet?:string[];

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    creativeOuletVisible?:Boolean;
    
    @Field({nullable:true})
    @Column({array:true,default:[]})
    religions?:string[];

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    religionsVisible?:Boolean;

    @Field({nullable:true})
    @Column({array:true,default:[]})
    religiousPractice?:string[];

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    religiousPracticeVisible?:Boolean;

    @Field({nullable:true})
    @Column({nullable:true})
    zodiac?:string;

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    zodiacVisible?:Boolean;

    @Field({nullable:true})
    @Column({nullable:true})
    meyerBriggs?:string;

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    meyerBriggsVisible?:Boolean;

    @Field({nullable:true})
    @Column({array:true,default:[]})
    characteristics?:string[];

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    characteristicsVisible?:Boolean;

    @Field({nullable:true})
    @Column({nullable:true})
    politics?:string;

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    politicsVisible?:Boolean;

    @Field({nullable:true})
    @Column({nullable:true})
    parentingGoal?:string;

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    parentingGoalVisible?:Boolean;

    @Field({nullable:true})
    @Column({array:true,default:[]})
    relationshipGoals?:string[];

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    relationshipGoalsVisible?:Boolean;

    @Field({nullable:true})
    @Column({array:true,default:[]})
    relationshipTypes?:string[];

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    relationshipTypesVisible?:Boolean;

    @Field({nullable:true})
    @Column({array:true,default:[]})
    pets?:string[];

    @Field({nullable:true})
    @Column({type:'boolean',default:true})
    petsVisible?:Boolean;
}

