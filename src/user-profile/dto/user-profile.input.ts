import { InputType, Field } from "@nestjs/graphql";
import { IsString,IsNumber, IsObject, IsBoolean, } from "class-validator";


@InputType()
export class UserProfileInput {
    @Field()   
    userId:string;

    @Field()
    @IsString()
    createdAt?:string;


    @Field({nullable:true})
    @IsString()
    profilePhoto:string;
    
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
    @IsString()
    locationId?:number
    
    @Field({nullable:true})
    @IsString()
    jobTitle:string;

    @Field({nullable:true})
    @IsBoolean()
    jobTitleVisible:Boolean;

    @Field({nullable:true})
    @IsString()
    company:string;

    @Field({nullable:true})
    @IsBoolean()
    companyVisible:Boolean;

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

    @Field({nullable:true})
    @IsString()
    ethinicity:string[];

    @Field({nullable:true})
    @IsBoolean()
    ethinicityVisible:Boolean;

    @Field({nullable:true})
    @IsString()
    sports:string[]

    
    @Field({nullable:true})
    @IsBoolean()
    sportsVisible:Boolean;

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

    @Field({nullable:true})
    @IsObject()
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

    @Field({nullable:true})
    @IsObject()
    musicGenre?:string[];

    @Field({nullable:true})
    @IsBoolean()
    musicGenreVisible?:Boolean;

    @Field({nullable:true})
    @IsObject()
    creativeOulet?:string[];

    @Field({nullable:true})
    @IsBoolean()
    creativeOuletVisible?:Boolean;
    
    @Field({nullable:true})
    @IsObject()
    religions?:string[];

    @Field({nullable:true})
    @IsBoolean()
    religionsVisible?:Boolean;

    @Field({nullable:true})
    @IsObject()
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

    @Field({nullable:true})
    @IsObject()
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

    @Field({nullable:true})
    @IsObject()
    relationshipGoals?:string[];

    @Field({nullable:true})
    @IsBoolean()
    relationshipGoalsVisible?:Boolean;

    @Field({nullable:true})
    @IsObject()
    relationshipTypes?:string[];

    @Field({nullable:true})
    @IsBoolean()
    relationshipTypesVisible?:Boolean;

    @Field({nullable:true})
    @IsObject()
    pets?:string[];

    @Field({nullable:true})
    @IsBoolean()
    petsVisible?:Boolean;
}

