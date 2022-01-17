import { Injectable, Logger } from '@nestjs/common';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';
import FileUpload from './entities/file-upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class FileUploadService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(FileUpload)
    private profileFilesRespository: Repository<FileUpload>,
  ) {}
  async uploadProfileFiles(filesBuffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: filesBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();
    console.log('upload result', uploadResult);

    const newFile = this.profileFilesRespository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });

    return await this.profileFilesRespository.save(newFile);
  }
 


  // async upload(file) {
  //   console.log("fileeee",file)
  //   const { originalname } = file;
  //   const bucketS3 = this.configService.get('AWS_PUBLIC_BUCKET_NAME');
  //   await this.uploadS3(file.buffer, bucketS3, originalname);
  // }

  // async uploadS3(file, bucket, name) {
  //   const s3 = this.getS3();
  //   const params = {
  //     Bucket: bucket,
  //     Key: String(name),
  //     Body: file,
  //   };
  //   return new Promise((resolve, reject) => {
  //     s3.upload(params, (err, data) => {
  //       if (err) {
  //         Logger.error(err);
  //         reject(err.message);
  //       }
  //       resolve(data);
  //     });
  //   });
  // }
  // ;

  // getS3() {
  //   return new S3({
  //     accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
  //     secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
  //   });
  // }
}
