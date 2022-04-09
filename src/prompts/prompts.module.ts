import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Prompts } from './entities/prompts.entity'
import { PromptsResolver } from './prompts.resolver'
import { PromptsService } from './prompts.service'

@Module({
    imports: [TypeOrmModule.forFeature([Prompts])],
    providers: [PromptsResolver, PromptsService],
    exports: [],
})
export class PromptsModule {}
