import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserPreferenceModule } from 'src/user-preference/user-preference.module'
import { UserProfileModule } from 'src/user-profile/user-profile.module'
import { UserModule } from 'src/user/user.module'
import { Matches } from './entities/matches.entity'
import { MatchesResolver } from './matches.resolver'
import { MatchesService } from './matches.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([Matches]),
        UserModule,
        UserProfileModule,
    ],
    providers: [MatchesResolver, MatchesService],
    exports: [MatchesService],
})
export class MatchesModule {}
