/* eslint-disable prettier/prettier */
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { UserProfile } from './entities/user-profile.entity';
import { UserProfileService } from './user-profile.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserProfileInput } from './dto/user-profile.input';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';

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

  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
  ): Promise<any> {
    // createReadStream()
    // .pipe(createWriteStream(__dirname+`/uploads/${filename}`))
    // .on('finish', () => true)
    // .on('error', () =>false)

    // console.log(this.someFunction)
    return true;
  }

}
