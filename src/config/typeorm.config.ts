/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as config from 'config'
import { User } from '../user/entities/user.entity'
import { UserDevice } from '../user-devices/entities/user-devices.entity'
import { LocationEntity } from '../location/entities/location.entity'
import { UserProfile } from '../user-profile/entities/user-profile.entity'
import { UserPreference } from '../user-preference/entities/user-preference.entity'
import { TagsEntity } from '../tags/entities/tags.entity'
import { Rating } from '../rating/entities/rating.entity'
import { RateCriterias } from '../rate-criterias/entities/rate-criterias.entity'
import { RatingComment } from '../rating-comment/entities/rating-comment.entity'
import { RatingGroup } from '../rating-group/entities/rating-group.entity'
import * as path from 'path'

const { type, host, port, username, password, database, synchronize } =
    config.get('DB')
console.log(host)
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: type,
    host: process.env.RDS_HOSTNAME || host, ///point this to the DB host localhost for develpment or instaclustr
    port: process.env.RDS_PORT || port, // default port for postgres is 5432
    username: process.env.RDS_USERNAME || username, //DB username here
    password: process.env.RDS_PASWORD || password, //Db password goes here
    database: process.env.RDS_DB_NAME || database, //Name of Database goes here
    entities: [path.resolve(__dirname, '**/*.entity{.ts,.js}')], // Gets all entities with extension .entity.ts
    synchronize: process.env.TYPEORM_SYC || synchronize,
    //  entities: [User,
    //             UserDevice,
    //             LocationEntity,
    //             UserProfile,
    //             UserPreference,
    //             TagsEntity,
    //             Rating,
    //             RateCriterias,
    //             RatingComment,
    //             RatingGroup],
    ssl: {
        rejectUnauthorized: false,
    },
}
