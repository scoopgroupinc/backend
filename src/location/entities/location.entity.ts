import { Entity, BaseEntity, PrimaryColumn, Column, Unique } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";

@Entity('location')
@ObjectType()
@Unique(['userId'])
export class LocationEntity extends BaseEntity{
    @Field()
    @PrimaryColumn({type:'bigint'})
    userId:string
    
    @Field({nullable:true})
    @Column({nullable:true})
    latitude: string;

    @Field({nullable:true})
    @Column({nullable:true})
    longitude:string;

    @Field({nullable:true})
    @Column({nullable:true})
    addressLine1:string;

    @Field({nullable:true})
    @Column({nullable:true})
    addressLine2:string;

    @Field({nullable:true})
    @Column({nullable:true})
    stateProvince:string;

    @Field({nullable:true})
    @Column({nullable:true})
    country:string;

    @Field({nullable:true})
    @Column({nullable:true})
    zipPostal:number
}