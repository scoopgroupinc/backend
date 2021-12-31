import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserPreference } from "./entities/user-preference.entity";
import { UserPreferenceInput } from "./dto/user-preference.input";


@Injectable()
export class UserPreferenceService{
    constructor(
        @InjectRepository(UserPreference)
       private userPreferenceRepository:Repository<UserPreference>
    ){}

    async saveUserPreference(userPreferenceInput:UserPreferenceInput){
        const {userId} =userPreferenceInput;
        if(await this.findone(userId)) return await this.UpdateOne(userPreferenceInput);

        userPreferenceInput.createdAt = new Date().toString();
        return await this.createOne(userPreferenceInput);
    }

    async findone(userId:string):Promise<UserPreference>{
        return await this.userPreferenceRepository.findOne({userId});
    }

    async UpdateOne(userPreferenceInput:UserPreferenceInput):Promise<any>{
        const {userId} = userPreferenceInput;
        return await this.userPreferenceRepository.createQueryBuilder()
               .update(UserPreference)
               .set(userPreferenceInput)
               .where('userId =: userId',{userId})
               .execute();
    }

    async createOne(userPreferenceInput:UserPreferenceInput):Promise<any>{
        return await this.userPreferenceRepository.save(userPreferenceInput);
    }

}