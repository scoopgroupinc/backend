import { LocationService } from "./location.service";
import { Mutation, Args, Query, Resolver } from "@nestjs/graphql";
import { CreateLocationInput } from "./dto/location.input";
import { LocationEntity } from "./entities/location.entity";

@Resolver(()=>LocationEntity)
export class LocationResolver{
    constructor(
        private locationService:LocationService
    ){}

    @Mutation( () =>LocationEntity )
    async saveUserLocation(
        @Args('createLocationInput') createLocationInput:CreateLocationInput
    ){
        return await this.locationService.saveUserLocation(createLocationInput);
    }
    
    @Query(()=>[LocationEntity],{name:'user-location',description:'fetch user location details'})
    async getUserLocation(@Args('userId') userId:string):Promise<LocationEntity>{
        return await this.locationService.findUser(userId);
    }








}