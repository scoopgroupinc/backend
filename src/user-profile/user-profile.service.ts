import { Injectable, BadRequestException } from "@nestjs/common";
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
         const profile = await this.findOne(userId);
         if(!profile) return new BadRequestException('User profile does not exist');
         return await this.userProfileRespository.save({...profile,...userProfileInput});
      
    }

    async createProfile(userProfileInput:UserProfileInput):Promise<any>{
        return await this.userProfileRespository.save(userProfileInput);
    }
}
