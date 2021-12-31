import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserData } from "./entities/user-data.entity";
import { Repository } from "typeorm";
import { UserDataInput } from "./dto/user-data.inputs";


@Injectable()
export class UserDataService{
    constructor(
        @InjectRepository(UserData)
        private userdataRepository:Repository<UserData>
    ){}

    async saveUserData(userDataInput:UserDataInput){
        const {userId} = userDataInput;        
        const user =await this.findOne(userId);
        if(user){
            return await this.UpdateOne(userDataInput);
        }
       
        userDataInput.createdAt = new Date().toString();
        return await this.createOne(userDataInput);
    }
   

    async findOne(userId:string):Promise<UserData>{
       return await this.userdataRepository.findOne({userId});
    }

    async UpdateOne(userDataInput:UserDataInput):Promise<any>{
          const {userId} = userDataInput;
        return await this.userdataRepository.createQueryBuilder()
                 .update(UserData)
                 .set(userDataInput)
                 .where('userId =: userId',{userId})
                 .execute();
    }

    async createOne(userDataInput:UserDataInput):Promise<any>{
        return await this.userdataRepository.save(userDataInput);
    }
}