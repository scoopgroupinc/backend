import { Injectable } from "@nestjs/common";
import {CreateLocationInput} from './dto/location.input'
import { locationDTO } from "./dto/location.dto";
import { LocationEntity } from "./entities/location.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class LocationService{
    constructor(
        @InjectRepository(LocationEntity)
        private locationRepository:Repository<LocationEntity>
    ){}

    async saveUserLocation(createLocationInput:CreateLocationInput){
        try {
            const {userId} = createLocationInput;
            const user = await this.findUser(userId);
            if(user) return await this.updateProfile(createLocationInput);
            return await this.createLocation(createLocationInput);
        } catch (error) {
            console.log(error)
            return error;
        }
    }
  
  
    async createLocation(createLocationInput:CreateLocationInput):Promise<any>{
           
     return await this.locationRepository.create(createLocationInput);
       
    }

    async findUser(userId:string):Promise<LocationEntity>{
        return await this.locationRepository.findOne({userId});
    }

    async updateProfile(createLocationInput:CreateLocationInput):Promise<any>{
        const {userId} = createLocationInput;
        return await this.locationRepository.createQueryBuilder()
                  .update(LocationEntity)
                  .set(createLocationInput)
                  .where('userId=:userId',{userId})
                  .execute();
    }


    async calculateDistance(lat1,long1,lat2,long2){
        var distance = await Math.sqrt(Math.pow((lat1-lat2),2) +Math.pow((long1-long2),2));

        return distance;
    }
}