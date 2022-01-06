import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { UserDevice } from "./entities/user-devices.entity";
import { UserDeviceService } from "./user-devices.service";
import { UserDeviceInput } from "./dto/user-devices.inputs";

import { GqlAuthGuard } from "../auth/guards/jwt-auth.guard";


@Resolver(()=>UserDevice)
export class UserDeviceResolver{
    constructor(
      private userDeviceService:UserDeviceService,
     
    ){}

    @Mutation(()=>UserDevice)
    // @UseGuards(AuthGuard())
    async saveDeviceDetails(@Args('userdeviceInput') userdeviceInput:UserDeviceInput):Promise<UserDeviceInput>{
        return await this.userDeviceService.saveDeviceDetails(userdeviceInput)
    }
    
    @Query(()=>UserDevice,{name:'getUserDevice'})
    // @UseGuards(AuthGuard())
    async getUserData(@Args('macAddress') macAddress:string,
                    //   @Args('userId') userId?:string,
                      ):Promise<UserDevice>{
        return await this.userDeviceService.findOne(macAddress);
    }

    
}