import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { Prompts } from './entities/prompts.entity'
import { PromptsResolver } from './prompts.resolver'
import { PromptsService } from './prompts.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([Prompts]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRATION },
        }),
    ],
    providers: [PromptsResolver, PromptsService],
    exports: [],
})
export class PromptsModule {}
