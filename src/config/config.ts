import { Auth } from 'src/auth/entities/auth.entity';
import { User } from '../user/entities/user.entity';
import { UserDevice } from '../user-devices/entities/user-devices.entity';
import { LocationEntity } from '../location/entities/location.entity';
import { UserProfile } from '../user-profile/entities/user-profile.entity';
import { UserPreference } from '../user-preference/entities/user-preference.entity';
import { TagsEntity } from '../tags/entities/tags.entity';

export const config = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecret: process.env.JWT_SECRET,
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
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
    ],
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

