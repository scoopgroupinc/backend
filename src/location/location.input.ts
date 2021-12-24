import { InputType, Field } from "@nestjs/graphql";
import {MinLength,isDateString, isLatitude, isNotEmpty, isLongitude, minLength, isEmpty} from 'class-validator';

@InputType()
export class CreateLocationInput{
    @MinLength(1,{
    message:'This field must be a valid latitude'
     })
    @Field()   
    latitude:string;
    
    @MinLength(1,{
     message:'This field must be a valid longitude'
     })
    @Field()
    longitude:string;
    
    @MinLength(5,{
      message:'Input must be a valid address'  
    })
    @Field()
    address_line_1:string;

    @MinLength(5,{
      message:'Input must be a valid address'  
      })
    @Field()
    address_line_2:string;

    @MinLength(1)
    @Field()
    state_province:string;

    @MinLength(4,{
        message:'Country must be valid'
    })
    @Field()
    country:string;

    @MinLength(5,{
        message:'Enter a valid zip/postal code'
    })
    @Field()
    zip_postal:number;
}