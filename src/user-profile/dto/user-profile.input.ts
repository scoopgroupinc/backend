import { InputType, Field, ID } from "@nestjs/graphql";
import { IsString,IsNumber, IsObject, IsBoolean, IsArray, } from "class-validator";


@InputType()
export class UserProfileInput {
    @Field(()=>ID)   
    userId:string;

    @Field(()=>String)
    @IsString()
    createdAt?:string;


    @Field(()=>String,{nullable:true})
    @IsString()
    profilePhoto?:string;
    
    @Field({nullable:true})
    @IsString()
    birthday?:string;

    @Field({nullable:true})
    @IsNumber()
    height?: number

   
    @Field({nullable: true})   
    @IsString() 
    gender?:string;

    @Field({nullable:true})
    locationId?:number
    
    @Field({nullable:true})
    @IsString()
    jobTitle?:string;

    @Field({nullable:true})
    @IsBoolean()
    jobTitleVisible?:Boolean;

    @Field({nullable:true})
    @IsString()
    company:string;

    @Field({nullable:true})
    @IsBoolean()
    companyVisible?:Boolean;

    @Field({nullable:true})
    @IsString()
    homeTown:string;

    @Field({nullable:true})
    @IsBoolean()
    homeTownVisible:Boolean;

    @Field({nullable:true})
    @IsString()
    school:string;

    @Field({nullable:true})
    @IsBoolean()
    schoolVisible:Boolean;

    @Field({nullable:true})
    @IsString()
    educationLevel:string;

    @Field({nullable:true})
    @IsBoolean()
    educationLevelVisible:Boolean;

    @Field(()=>[String],{nullable:true})
    @IsArray()
    ethinicity:string[];

    @Field({nullable:true})
    @IsBoolean()
    ethinicityVisible:Boolean;

    @Field(()=>[String],{nullable:true})
    @IsArray()
    sports?:string[]

    
    @Field({nullable:true})
    @IsBoolean()
    sportsVisible?:Boolean;

    @Field({nullable:true})
    @IsString()
    smoking?:string;

    @Field({nullable:true})
    @IsBoolean()
    smokingVisible?:Boolean;

    @Field({nullable:true})
    @IsString()
    cannabis?:string;

    @Field({nullable:true})
    @IsBoolean()
    cannabisVisible?:Boolean;

    @Field({nullable:true})
    @IsString()
    alcohol?:string;

    @Field({nullable:true})
    @IsBoolean()
    alcoholVisible?:Boolean;

    @Field({nullable:true})
    @IsString()
    drugs?:string;

    @Field({nullable:true})
    @IsBoolean()
    drugsVisible?:Boolean;

    @Field(()=>[String],{nullable:true})
    @IsArray()
    diet?:string[];

    @Field({nullable:true})
    @IsBoolean()
    dietVisible?:Boolean;

    @Field({nullable:true})
    @IsString()
    languages?:string;

    @Field({nullable:true})
    @IsBoolean()
    languagesVisible?:Boolean;

    @Field(()=>[String],{nullable:true})
    @IsArray()
    musicGenre?:string[];

    @Field({nullable:true})
    @IsBoolean()
    musicGenreVisible?:Boolean;

    @Field(()=>[String],{nullable:true})
    @IsArray()
    creativeOulet?:string[];

    @Field({nullable:true})
    @IsBoolean()
    creativeOuletVisible?:Boolean;
    
    @Field(()=>[String],{nullable:true})
    @IsArray()
    religions?:string[];

    @Field({nullable:true})
    @IsBoolean()
    religionsVisible?:Boolean;

    @Field(()=>[String],{nullable:true})
    @IsArray()
    religiousPractice?:string[];

    @Field({nullable:true})
    @IsBoolean()
    religiousPracticeVisible?:Boolean;

    @Field({nullable:true})
    @IsString()
    zodiac?:string;

    @Field({nullable:true})
    @IsBoolean()
    zodiacVisible?:Boolean;

    @Field({nullable:true})
    @IsString()
    meyerBriggs?:string;

    @Field({nullable:true})
    @IsBoolean()
    meyerBriggsVisible?:Boolean;

    @Field(()=>[String],{nullable:true})
    @IsArray()
    characteristics?:string[];

    @Field({nullable:true})
    @IsBoolean()
    characteristicsVisible?:Boolean;

    @Field({nullable:true})
    @IsString()
    politics?:string;

    @Field({nullable:true})
    @IsBoolean()
    politicsVisible?:Boolean;

    @Field({nullable:true})
    @IsString()
    parentingGoal?:string;

    @Field({nullable:true})
    @IsBoolean()
    parentingGoalVisible?:Boolean;

    @Field(()=>[String],{nullable:true})
    @IsArray()
    relationshipGoals?:string[];

    @Field({nullable:true})
    @IsBoolean()
    relationshipGoalsVisible?:Boolean;

    @Field(()=>[String],{nullable:true})
    @IsArray()
    relationshipTypes?:string[];

    @Field({nullable:true})
    @IsBoolean()
    relationshipTypesVisible?:Boolean;

    @Field(()=>[String],{nullable:true})
    @IsArray()
    pets?:string[];

    @Field({nullable:true})
    @IsBoolean()
    petsVisible?:Boolean;
}

