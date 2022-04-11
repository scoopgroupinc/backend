import * as configs from 'config'
import { Auth } from 'src/auth/entities/auth.entity'
import { User } from '../user/entities/user.entity'
import { UserDevice } from '../user-devices/entities/user-devices.entity'
import { LocationEntity } from '../location/entities/location.entity'
import { UserProfile } from '../user-profile/entities/user-profile.entity'
import { UserPreference } from '../user-preference/entities/user-preference.entity'
import { TagsEntity } from '../tags/entities/tags.entity'
import { Rating } from 'src/rating/entities/rating.entity'
import { RatingComment } from 'src/rating-comment/entities/rating-comment.entity'
import { RatingGroup } from 'src/rating-group/entities/rating-group.entity'
import { RateCriterias } from 'src/rate-criterias/entities/rate-criterias.entity'
import { Prompts } from 'src/prompts/entities/prompts.entity'
import { UserPrompts } from '../user-prompts/entities/user-prompts.entity'
import { Complaints } from '../complaints/entities/complaints.entity'

const { type, host, port, username, password, database, synchronize } =
    configs.get('DB')
const server = configs.get('server')

export const config = () => ({
    port: parseInt(process.env.PORT, 10) || server.port,
    jwtSecret: process.env.JWT_SECRET,
    database: {
        type: process.env.DB_TYPE || type,
        host: process.env.DB_HOST || host,
        port: process.env.DB_PORT || port,
        username: process.env.DB_USERNAME || username,
        password: process.env.DB_PASSWORD || password,
        database: process.env.DB_DATABASE || database,
        synchronize: true,
        logging: false,
        entities: [
            User,
            Auth,
            UserDevice,
            LocationEntity,
            UserProfile,
            UserPreference,
            TagsEntity,
            Rating,
            RatingComment,
            RatingGroup,
            RateCriterias,
            Prompts,
            UserPrompts,
            Complaints,
        ],
        ssl: {
            rejectUnauthorized: false,
        },
    },
    fileServer_Url: process.env.BE_FILE_SERVER_URL,
})
