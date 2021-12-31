import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserProfile } from "./entities/user-profile.entity";
import { Repository } from "typeorm";
import { UserProfileInput } from "./dto/user-profile.input";


@Injectable()
export class UserProfileService{
    constructor(
        @InjectRepository(UserProfile)
        private userProfileRespository:Repository<UserProfile>
    ){}

    async saveUserProfile(userProfileInput:UserProfileInput){
       try {
           
             const {userId} = userProfileInput;        
        
            const user =await this.findOne(userId);
            if(user){
                return await this.updateOne(userProfileInput);
            }
        
            userProfileInput.createdAt = new Date().toString();
            return await this.createProfile(userProfileInput);
        } catch (error) {
            console.log(error)
            return error
            
        }
    }
   

    async findOne(userId:string):Promise<UserProfile>{
       return await this.userProfileRespository.findOne({userId});
    }

    async updateOne(userProfileInput:UserProfileInput):Promise<any>{
          const {userId} = userProfileInput;
        return await this.userProfileRespository.createQueryBuilder()
                 .update(UserProfile)
                 .set(userProfileInput)
                 .where('userId =: userId',{userId})
                 .execute();
    }

    async createProfile(userProfileInput:UserProfileInput):Promise<any>{
        return await this.userProfileRespository.save(userProfileInput);
    }
}
