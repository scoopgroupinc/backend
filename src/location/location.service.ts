import { Injectable } from "@nestjs/common";
import {CreateLocationInput} from './location.input'
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

   async createLocation(createLocationInput:CreateLocationInput):Promise<locationDTO>{
      const {latitude,longitude,address_line_1,address_line_2,country,state_province,zip_postal}= createLocationInput;
      
      const location= this.locationRepository.create({
          latitude,
          longitude,
          address_line_1,
          address_line_2,
          country,
          state_province,
          zip_postal,
      });

      return this.locationRepository.save(location);
    
    }
}