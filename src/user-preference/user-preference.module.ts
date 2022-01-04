import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserPreference } from "./entities/user-preference.entity";
import { UserPreferenceResolver } from "./user-preference.resolver";
import { UserPreferenceService } from "./user-preference.service";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports:[
            TypeOrmModule.forFeature([UserPreference]),
            PassportModule.register({defaultStrategy:'jwt'})
    ],
    providers:[
        UserPreferenceResolver,UserPreferenceService
    ],
    exports:[]
})

export class UserPreferenceModule{}