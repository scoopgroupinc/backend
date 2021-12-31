import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { UseGuards } from "@nestjs/common";

import { UserPreference } from "./entities/user-preference.entity";
import { UserPreferenceService } from "./user-preference.service";
import { UserPreferenceInput } from "./dto/user-preference.input";

@Resolver(()=>UserPreference)
export class UserPreferenceResolver{
    constructor(
      private preferenceService:UserPreferenceService,
    ){}

    @Mutation(()=>UserPreference)
    @UseGuards(AuthGuard())
    async saveUserPreference(@Args('userPreferenceInput') userPreferenceInput:UserPreferenceInput):Promise<UserPreferenceInput>{
        return await this.preferenceService.saveUserPreference(userPreferenceInput);
    }

    @Query(()=>[UserPreference],{name:'user-preference',description:'fetch user preference'})
    @UseGuards(AuthGuard())
    async getUserPreference(@Args('userId') userId:string):Promise<UserPreference>{
        return await this.preferenceService.findone(userId);
    }
}

