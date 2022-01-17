import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import FileUpload from "./entities/file-upload.entity"
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [TypeOrmModule.forFeature([FileUpload]),MulterModule.register({dest:"./myuploads"})],
  controllers: [FileUploadController],
  providers: [FileUploadService, ConfigService],
})
export class FileUploadModule {}
