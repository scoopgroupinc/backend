import { InputType, Field, ID } from "@nestjs/graphql";
import {MinLength, IsLatitude, IsNotEmpty, IsLongitude, IsOptional} from 'class-validator';

@InputType()
export class CreateLocationInput{
    @Field(()=>ID)
    userId:string;

    @MinLength(1,{
    message:'This field must be a valid latitude'
     })
     @IsLatitude()
    @Field()   
    latitude:string;
    
    @MinLength(1,{
     message:'This field must be a valid longitude'
     })
    @IsLongitude()
    @Field()
    longitude:string;
    
    @MinLength(5,{
      message:'Input must be a valid address'  
    })
    @Field()
    addressLine1:string;

    @MinLength(5,{
      message:'Input must be a valid address'  
      })
    @Field()
    @IsOptional()
    addressLine2?:string;

    @MinLength(1)
    @Field()
    @IsNotEmpty()
    stateProvince:string;

    @MinLength(4,{
        message:'Country must be valid'
    })
    @IsNotEmpty()
    @Field()
    country?:string;

    @MinLength(5,{
        message:'Enter a valid zip/postal code'
    })
    @Field()
    zipPostal:number;
}