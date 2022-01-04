import { Resolver, Args, Mutation,Query } from "@nestjs/graphql";
import { UserProfile } from "./entities/user-profile.entity";
import { UserProfileService } from "./user-profile.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserProfileInput } from "./dto/user-profile.input";

@Resolver(()=>UserProfile)
export class UserProfileResolver{
    constructor(
        private userProfileService:UserProfileService
        
    ){}

     @Mutation(()=>UserProfile)
    //  @UseGuards(AuthGuard())
    async saveUserProfile(@Args('userProfileInput') userProfileInput:UserProfileInput):Promise<any>{
      return await this.saveUserProfile(userProfileInput);
    }

    @Query(()=>UserProfile,{name:'user_Profile'})
    async getUserProfile(@Args('userId') userId:string):Promise<UserProfile>{
        return await this.userProfileService.findOne(userId);
    }
}