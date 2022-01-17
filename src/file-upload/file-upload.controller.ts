import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';
const express = require('express');
const multer = require('multer');

import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}


  @Post('file')
  @UseInterceptors(FileInterceptor('image'))
  async addProfileFiles(
   @UploadedFile() file: Express.Multer.File,
  ) {
    console.log("file",file)
    return await this.fileUploadService.uploadProfileFiles(
      file.buffer,
      file.originalname,
    );
  }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // async upload(@UploadedFile() file) {
  //   return await this.fileUploadService.upload(file);
  // }
}
