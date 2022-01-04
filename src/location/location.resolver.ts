import { LocationService } from "./location.service";
import { Mutation, Args } from "@nestjs/graphql";
import { CreateLocationInput } from "./location.input";
import { LocationType } from "./location.type";

export class LocationResolver{
    constructor(
        private locationService:LocationService
    ){}

    @Mutation( () =>LocationType )
    createLocation(
        @Args('createLocationInput') createLocationInput:CreateLocationInput
    ){
        return this.locationService.createLocation(createLocationInput);
    }
}