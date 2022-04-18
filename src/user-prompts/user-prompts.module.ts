import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserPrompts } from './entities/user-prompts.entity'
import { UserPromptsService } from './user-prompts.service'
import { UserPromptsResolver } from './user-prompts.resolver'
import { AuthModule } from 'src/auth/auth.module'

@Module({
    imports: [TypeOrmModule.forFeature([UserPrompts]), HttpModule, AuthModule],
    providers: [UserPromptsResolver, UserPromptsService],
    exports: [],
})
export class UserPromptsModule {}
