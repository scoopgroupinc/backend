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
import { Matches } from 'src/matches/entities/matches.entity'
import { UserChoice } from 'src/user-choice/entities/user-choice.entity'
import { MetaDetails } from 'src/meta-details/entities/meta.entity'
import { FeedBack } from 'src/feedback/entities/feedback.entity'
import { BlockedUsers } from 'src/blocked-users/entities/blocked-users.entity'
import { UserTagsTypeVisibleEnity } from 'src/user-tags-type-visible/entities/user-tags-type-visible.entity'
import { UserTagsEntity } from 'src/user-tags/entities/user-tags.entity'
import { GroupCodes } from 'src/group-code/entities/group.entity'
import { UserGroupCodes } from 'src/group-code/entities/userCodes.entity'
import { UserAuthProvider } from 'src/user/entities/userAuthProvider.entity'

export const config = () => ({
    port: parseInt(process.env.PORT, 10),
    jwtSecret: process.env.JWT_SECRET,
    database: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        // synchronize: true,
        logging: false,
        entities: [
            User,
            Auth,
            UserAuthProvider,
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
            Matches,
            UserChoice,
            MetaDetails,
            FeedBack,
            BlockedUsers,
            UserTagsTypeVisibleEnity,
            UserTagsEntity,
            GroupCodes,
            UserGroupCodes,
        ],
        ssl: {
            rejectUnauthorized: false,
        },
    },
    fileServer_Url: process.env.BE_FILE_SERVER_URL,
})
