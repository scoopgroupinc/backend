import { LocationService } from './location.service'
import { Mutation, Args, Query, Resolver } from '@nestjs/graphql'
import { CreateLocationInput } from './dto/location.input'
import { LocationEntity } from './entities/location.entity'
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard'
import { UseGuards } from '@nestjs/common'

@Resolver(() => LocationEntity)
export class LocationResolver {
    constructor(private locationService: LocationService) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => LocationEntity)
    async saveUserLocation(
        @Args('createLocationInput') createLocationInput: CreateLocationInput
    ): Promise<any> {
        return await this.locationService.saveUserLocation(createLocationInput)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => LocationEntity, {
        name: 'getUserLocation',
        nullable: true,
        description: 'fetch user location details',
    })
    async getUserLocation(@Args('userId') userId: string): Promise<any> {
        return await this.locationService.findUser(userId)
    }
}
