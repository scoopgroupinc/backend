import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocationEntity } from "./entities/location.entity";
import { LocationResolver } from "./location.resolver";
import { LocationService } from "./location.service";
import { PassportModule } from "@nestjs/passport";


@Module({
    imports:[
        TypeOrmModule.forFeature([LocationEntity]),
        PassportModule.register({defaultStrategy:'jwt'}),
    ],
    providers:[LocationResolver,LocationService],
    exports:[]
})

export class LocationModule{}