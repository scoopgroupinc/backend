import { Resolver, Args, Mutation,Query } from "@nestjs/graphql";
import { UserProfile } from "./entities/user-profile.entity";
import { UserProfileService } from "./user-profile.service";
import { AuthGuard } from "@nestjs/passport";
import { UserProfileInput } from "./dto/user-profile.input";
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
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
import ProfileFiles from "./entities/profileFiles.entity";

@Resolver(() => UserProfile)
export class UserProfileResolver {
  constructor(private userProfileService: UserProfileService) {}

  @Mutation(() => UserProfile, { name: 'saveUserProfile' })
  async saveUserProfile(
    @Args('userProfileInput') userProfileInput: UserProfileInput,
  ): Promise<any> {
    return await this.saveUserProfile(userProfileInput);
  }

  @Query(() => Boolean, { name: 'getUserProfile' })
  async getUserProfile(@Args('userId') userId: string): Promise<UserProfile> {
    return await this.userProfileService.findOne(userId);
  }

  // @Mutation(() => Boolean)
  //     async uploadFile(@Args({name: 'file', type: () => GraphQLUpload})
  //     {
  //         createReadStream,
  //         filename
  //     }: FileUpload): Promise<boolean> {
  //         return new Promise(async (resolve, reject) =>
  //             createReadStream()
  //                 .pipe(createWriteStream(`./uploads/${filename}`))
  //                 .on('finish', () => resolve(true))
  //                 .on('error', () => reject(false))
  //         );
  //     }

  // @Mutation(() => Boolean)
  // async uploadFile(
  //   @Args({name: 'file', type: () => GraphQLUpload})
  //   {createReadStream,filename}: FileUpload
  // ){
  //    console.log("fileeeeeeeeee",filename)
  // }

  @Mutation(() => ProfileFiles)
  @UseInterceptors(FileInterceptor('file'))
  async addProfileFiles(
    @Args({ name: 'image', type: () => GraphQLUpload }) file,
  ): Promise<any> {
    console.log('the uploaded file', file);
    return await this.userProfileService.uploadProfileFiles(
      file.buffer,
      file.originalname,
    );
  }
}


// '{"query":"mutation{\n  uploadFile(file:$file)\n}"}' 