/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProfile } from "./entities/user-profile.entity";
import { UserProfileResolver } from "./user-profile.resolver";
import { UserProfileService } from "./user-profile.service";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports:[
        TypeOrmModule.forFeature([UserProfile]),
        PassportModule.register({defaultStrategy:'jwt'})
    ],
    providers:[UserProfileResolver,UserProfileService],
    exports:[]
})
export class UserProfileModule{}