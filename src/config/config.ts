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

export const config = () => ({
    port: parseInt(process.env.PORT, 10),
    jwtSecret: process.env.JWT_SECRET,
    database: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST2,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
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
