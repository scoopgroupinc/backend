import { Entity, BaseEntity, PrimaryColumn, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity('location')
@Unique(['userId'])
export class LocationEntity extends BaseEntity{
    @PrimaryGeneratedColumn({type:'bigint'})
    id:string
    
    @Column()
    userId:string

    @Column()
    latitude: string;

    @Column()
    longitude:string;

    @Column()
    address_line_1:string;

    @Column()
    address_line_2:string;

    @Column()
    state_province:string;

    @Column()
    country:string;

    @Column()
    zip_postal:number
}