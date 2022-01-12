import { Resolver, Args, Mutation,Query } from "@nestjs/graphql";
import { UserProfile } from "./entities/user-profile.entity";
import { UserProfileService } from "./user-profile.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserProfileInput } from "./dto/user-profile.input";
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';


@Resolver(() => UserProfile)
export class UserProfileResolver {
  constructor(private userProfileService: UserProfileService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserProfile, { name: 'saveUserProfile' })
  async saveUserProfile(
    @Args('userProfileInput') userProfileInput: UserProfileInput,
  ): Promise<any> {
    return await this.saveUserProfile(userProfileInput);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => UserProfile, { name: 'getUserProfile' })
  async getUserProfile(@Args('userId') userId: string): Promise<UserProfile> {
    return await this.userProfileService.findOne(userId);
  }
}