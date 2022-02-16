/* eslint-disable prettier/prettier */
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream, statSync } from 'fs';
import { GraphQLString } from 'graphql';
import { v4 as uuid } from 'uuid';

import { UserProfile } from './entities/user-profile.entity';
import { UserProfileService } from './user-profile.service';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserProfileInput } from './dto/user-profile.input';

@Resolver(() => UserProfile)
export class UserProfileResolver {
  constructor(private userProfileService: UserProfileService) { }

  @Mutation(() => UserProfile, { name: 'saveUserProfile' })
  //  @UseGuards(AuthGuard())
  async saveUserProfile(
    @Args('userProfileInput') userProfileInput: UserProfileInput,
    // eslint-disable-next-line prettier/prettier
  ): Promise<any> {
    return await this.userProfileService.saveUserProfile(userProfileInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserProfile, { name: 'getUserProfile' })
  async getUserProfile(@Args('userId') userId: string): Promise<any> {
    return await this.userProfileService.findOne(userId);
  }

  @Mutation(() => GraphQLString)
  async uploadProfilePic(
    @Args('userId') userId: string,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename, mimetype }: FileUpload): Promise<any> {

    await this.userProfileService.fileFilter(mimetype)
    this.userProfileService.createFileStream(createReadStream, filename, userId)
    return 'success';
  }

  @Query(() => GraphQLString)
  async getUserProfilePic(@Args('userId') userId: string) {
    return await this.userProfileService.getUserProfilePic(userId)
  }

}
