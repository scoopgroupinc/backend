/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, Logger, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { S3 } from "aws-sdk";
import { v4 as uuid } from 'uuid';
import { createWriteStream, readFileSync, statSync, unlink } from "fs";


import { UserProfile } from "./entities/user-profile.entity";
import { Repository } from "typeorm";
import { UserProfileInput } from "./dto/user-profile.input";
import { pipeline } from "stream";
import { promisify } from 'util';

@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(UserProfile)
        private userProfileRespository: Repository<UserProfile>
    ) { }

    bucketS3 = process.env.AWS_PUBLIC_BUCKET_NAME;
    async saveUserProfile(userProfileInput: UserProfileInput) {
        try {

            const { userId } = userProfileInput;

            const user = await this.findOne(userId);
            if (user) {
                return await this.updateOne(userProfileInput);
            }

            userProfileInput.createdAt = new Date().toISOString().toString();
            return await this.createProfile(userProfileInput);
        } catch (error) {
            console.log(error)
            return error

        }
    }


    async findOne(userId: string): Promise<UserProfile> {
        return await this.userProfileRespository.findOne({ userId });
    }

    async updateOne(userProfileInput: UserProfileInput): Promise<any> {
        const { userId } = userProfileInput;
        const profile = await this.findOne(userId);
        if (!profile) return new BadRequestException('User profile does not exist');
        return await this.userProfileRespository.save({ ...profile, ...userProfileInput });

    }

    async createProfile(userProfileInput: UserProfileInput): Promise<any> {
        return await this.userProfileRespository.save(userProfileInput);
    }

    async updateProfilePhoto(userId: string, key: string): Promise<any> {
        const profile = await this.findOne(userId);
        if (!profile) return new BadRequestException('User profile does not exist');
        return await this.userProfileRespository.save({ ...profile, profilePhoto: key });
    }

    async getUserProfilePic(userId: string) {
        const profile = await this.findOne(userId);
        const s3 = this.getS3();
        const fileUrl = s3.getSignedUrl('getObject', {
            Bucket: this.bucketS3,
            Key: profile.profilePhoto,
            Expires: 900
        });
        return fileUrl;
    }


    // async uploadPhoto(filename, mimetype, filePath): Promise<any> {
    //     // const { filename, createReadStream, mimetype } = file;
    //     if (await this.fileFilter(mimetype)) {
    //         // const filePath = await this.createFileStream(createReadStream, filename)
    //         const { key }: any = await this.uploadS3(filename, filePath);
    //         console.log(key);
    //         ///save or update to the dB
    //         ///also remember to schedule deleting files as they will not be needed
    //         // return await this.getUserProfilePic(key)
    //     }
    // }


    async uploadS3(filename: string, filePath: string, userId: string) {
        const s3 = this.getS3();
        const params = {
            Bucket: `${this.bucketS3}/ProflePics`,
            Key: `${uuid() + '-' + userId + '-' + filename}`,
            Body: await readFileSync(filePath),
            ContentType: "application/octet-stream",
        };

        return new Promise((resolve, reject) => {
            s3.upload(params, async (err, data) => {
                if (err) {
                    Logger.error(err);
                    reject(err.message);
                }
                console.log(data)
                await this.updateProfilePhoto(userId, data.key);
                resolve(data);
            });
        });
    }

    async createFileStream(createReadStream, filename, userId): Promise<any> {
        const filepath = `./uploads/${uuid() + '-' + filename}`;
        new Promise(async (resolve, reject) =>
            createReadStream()
                .pipe(createWriteStream(filepath))
                .on('finish', () => resolve(true))
                .on('error', () => reject(false))
        );
        const s3Upload = this.uploadS3;
        const intervalObj = setInterval(async function () {

            const fileExists = statSync(filepath);
            console.log('size=>', fileExists.size)

            if (fileExists.size > 0) {
                clearInterval(intervalObj);
                await s3Upload(filename, filepath, userId);
            }
        }, 2000);

    }

    async deleteCreateFileStream(filePath: string) {
        await unlink(filePath, (err) => {
            if (err) {
                console.error(err);
                return;
            }

        })
    }

    getS3() {
        return new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }

    fileFilter(mimetype) {
        console.log(mimetype)
        if (mimetype !== 'image/png' || mimetype !== 'image/jpg') {
            throw new HttpException('Invalid file type, only JPEG and PNG is allowed!', HttpStatus.NOT_ACCEPTABLE);
        }
        return true;
    }
}
