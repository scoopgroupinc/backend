
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserProfile } from "./entities/user-profile.entity";
import { Repository } from "typeorm";
import { UserProfileInput } from "./dto/user-profile.input";
import { ConfigService } from '@nestjs/config';
import  ProfileFiles from "./entities/profileFiles.entity"
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';


@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRespository: Repository<UserProfile>,
    private readonly configService: ConfigService,
    @InjectRepository(ProfileFiles) private profileFilesRespository: Repository<ProfileFiles>,
  ) {}

  async saveUserProfile(userProfileInput: UserProfileInput) {
    try {
      const { userId } = userProfileInput;

      const user = await this.findOne(userId);
      if (user) {
        return await this.updateOne(userProfileInput);
      }

      userProfileInput.createdAt = new Date().toString();
      return await this.createProfile(userProfileInput);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findOne(userId: string): Promise<UserProfile> {
    return await this.userProfileRespository.findOne({ userId });
  }

  async updateOne(userProfileInput: UserProfileInput): Promise<any> {
    const { userId } = userProfileInput;
    const profile = await this.findOne(userId);
    if (!profile) return new BadRequestException('User profile does not exist');
    return await this.userProfileRespository.save({
      ...profile,
      ...userProfileInput,
    });
  }

  async createProfile(userProfileInput: UserProfileInput): Promise<any> {
    return await this.userProfileRespository.save(userProfileInput);
  }

  async uploadProfileFiles(filesBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: filesBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();
      console.log("upload result",uploadResult)

    const newFile = this.profileFilesRespository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    
    return await this.profileFilesRespository.save(newFile);
  }

  // async getById(userId: string) {
  //   const user = await this.userProfileRespository.findOne({ userId });
  //   if (user) {
  //     return user;
  //   }
  //   throw new HttpException(
  //     'User with this id does not exist',
  //     HttpStatus.NOT_FOUND,
  //   );
  // }

  // async addFiles(userId: string, imageBuffer: Buffer, filename: string) {
  //   const avatar = await this.uploadProfileFiles(imageBuffer, filename);
  //   const user = await this.getById(userId);
  //   await this.userProfileRespository.update(userId, {
  //     ...user,
  //     avatar,
  //   });
  //   return;
  // }
}
