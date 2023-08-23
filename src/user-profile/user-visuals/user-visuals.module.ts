import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserProfile } from '../user-profile.entity'
import { UserVisuals } from './user-visuals.entity'

@Module({
    imports: [TypeOrmModule.forFeature([UserProfile, UserVisuals])],
})
export class UserVisualsModule {}
