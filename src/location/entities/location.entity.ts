import { Entity, BaseEntity, PrimaryColumn, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('location')
export class LocationEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

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