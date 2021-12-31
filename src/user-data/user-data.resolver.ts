import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { UserData } from "./entities/user-data.entity";
import { UserDataService } from "./user-data.service";
import { JwtService } from "@nestjs/jwt";
import { UserDataInput } from "./dto/user-data.inputs";

import { GqlAuthGuard } from "../auth/guards/jwt-auth.guard";


@Resolver(()=>UserData)
export class UserDataResolver{
    constructor(
      private userDataService:UserDataService,
      private jwtService:JwtService,
    ){}

    @Mutation(()=>UserData)
    @UseGuards(AuthGuard())
    async saveuserData(@Args('userdataInput') userdataInput:UserDataInput):Promise<UserDataInput>{
        return await this.userDataService.saveUserData(userdataInput)
    }
    
    @Query(()=>UserData,{name:'user-data'})
    @UseGuards(AuthGuard())
    async getUserData(@Args('userid') userId:string):Promise<UserData>{
        return await this.userDataService.findOne(userId);
    }
}