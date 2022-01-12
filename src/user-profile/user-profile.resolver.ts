import { Resolver, Args, Mutation,Query } from "@nestjs/graphql";
import { UserProfile } from "./entities/user-profile.entity";
import { UserProfileService } from "./user-profile.service";
import { AuthGuard } from "@nestjs/passport";
import { UserProfileInput } from "./dto/user-profile.input";
import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
const express = require('express')
const multer  = require('multer')

import { FileInterceptor } from '@nestjs/platform-express';

@Resolver(() => UserProfile)
export class UserProfileResolver {
  constructor(private userProfileService: UserProfileService) {}

  @Mutation(() => UserProfile, { name: 'saveUserProfile' })
  //  @UseGuards(AuthGuard())
  async saveUserProfile(
    @Args('userProfileInput') userProfileInput: UserProfileInput,
  ): Promise<any> {
    return await this.saveUserProfile(userProfileInput);
  }

  @Query(() => UserProfile, { name: 'getUserProfile' })
  async getUserProfile(@Args('userId') userId: string): Promise<UserProfile> {
    return await this.userProfileService.findOne(userId);
  }

  @Mutation(() => UserProfile, { name: 'uploadProfileFiles' })
  @UseInterceptors(FileInterceptor('file'))
  async addProfileFiles(
    @Req() request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.userProfileService.addFiles(
      request.user.userId,
      file.buffer,
      file.originalname,
    );
  }
}