import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserPreference } from './entities/user-preference.entity'
import { UserPreferenceResolver } from './user-preference.resolver'
import { UserPreferenceService } from './user-preference.service'

@Module({
    imports: [TypeOrmModule.forFeature([UserPreference])],
    providers: [UserPreferenceResolver, UserPreferenceService],
    exports: [UserPreferenceService],
})
export class UserPreferenceModule {}
