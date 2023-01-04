import { Resolver, Mutation, Args } from '@nestjs/graphql'
// import { GraphQLUpload, FileUpload } from 'graphql-upload'
import { createReadStream, createWriteStream } from 'fs'
import { MessageDTO } from './dto/message.dto'
import { ChatService } from './chat.service'
import { MessageEntity } from './entities/messages.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { HttpStatus } from '@nestjs/common'
import { FileTypes, MedaFileTypes } from './file.types'
import ShortUniqueId from 'short-unique-id'

@Resolver()
export class FileResolver {
    constructor(
        @InjectRepository(MessageEntity)
        private chatService: ChatService
    ) {}

    //   @Mutation(() => MessageDTO)
    //   async uploadFile(@Args({name: 'file',type: () => GraphQLUpload})
    //   {
    //       createReadStream,
    //       filename
    //   }: FileUpload,
    //   @Args('messagedto') messagedto:MessageDTO
    //  ): Promise<MessageDTO> {
    //   const uid= new ShortUniqueId({ length: 10 });
    //   const fileType:MedaFileTypes = await this.checkFileType(messagedto.type);
    //   const newFilename: string= fileType.prefix + uid() ;
    //     const saveFile =  new Promise(async (resolve,reject)=>{

    //           createReadStream()
    //           .pipe(
    //               createWriteStream(`./uploads/messageFiles/${fileType.type}/${newFilename}`)
    //           )
    //           .on('finish',()=>resolve({filename,status:201}))
    //           .on('error',()=>reject(null))
    //      })
    //      if(!saveFile) throw HttpStatus.EXPECTATION_FAILED;
    //      messagedto.media_file = newFilename;
    //      return null;
    //   }

    checkFileType(fileType): MedaFileTypes {
        switch (fileType) {
            case fileType === FileTypes.image:
                return { type: FileTypes.image, prefix: 'IMG-' }

            case fileType === FileTypes.audio:
                return { type: FileTypes.audio, prefix: 'AUD-' }

            case fileType === FileTypes.video:
                return { type: FileTypes.video, prefix: 'VID-' }

            case fileType === FileTypes.document:
                return { type: FileTypes.document, prefix: 'DOC-' }

            default:
                return { type: FileTypes.image, prefix: 'IMG-' }
        }
    }
}
