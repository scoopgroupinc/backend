import { Resolver, Args, Mutation,Query } from "@nestjs/graphql";
import { UserProfile } from "./entities/user-profile.entity";
import { UserProfileService } from "./user-profile.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Resolver(()=>UserProfile)
export class UserProfileResolver{
    constructor(
        private userProfileService:UserProfileService
        
    ){}

     @Mutation(()=>UserProfile)
     @UseGuards(AuthGuard())
    async saveUserProfile(@Args('userProfile') userProfile:UserProfile):Promise<UserProfile>{
      return await this.saveUserProfile(userProfile);
    }

    @Query(()=>[UserProfile],{name:'user-Profile'})
    async getUserProfile(@Args('userId') userId:string):Promise<UserProfile>{
        return await this.userProfileService.findOne(userId);
    }
}