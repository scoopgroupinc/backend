import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagsEntity } from "./entities/tags.entity";
import { TagsResolver } from "./tags.resolver";
import { TagsService } from "./tags.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[
       TypeOrmModule.forFeature([TagsEntity]),
         JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    ],
    providers:[
         TagsResolver,TagsService
    ],
    exports:[]
})
export class TagsModule{}