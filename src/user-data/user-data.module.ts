import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserData } from "./entities/user-data.entity";
import { UserDataResolver } from "./user-data.resolver";
import { UserDataService } from "./user-data.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([UserData]),        
    ],
    providers:[UserDataResolver,UserDataService],
    exports:[]
})

export class UserdataModule{}