import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType('location')
export class LocationType{
    @Field(() =>ID)
    id:number

    @Field()
    latitude:string;

    @Field()
    longitude:string;

    @Field()
    address_line_1:string;

    @Field()
    address_line_2:string;

    @Field()
    state_province:string;

    @Field()
    country:string;

    @Field()
    zip_postal:number;
}