import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserPrompts } from './entities/user-prompts.entity'
import { UserPromptsService } from './user-prompts.service'
import { UserPromptsResolver } from './user-prompts.resolver'
import { PromptsModule } from 'src/prompts/prompts.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RatingModule } from 'src/rating/rating.module'
import { UserProfileModule } from 'src/user-profile/user-profile.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserPrompts]),
        PromptsModule,
        RatingModule,
        UserProfileModule,
    ],
    providers: [UserPromptsResolver, UserPromptsService],
    exports: [UserPromptsService],
})
export class UserPromptsModule {}
