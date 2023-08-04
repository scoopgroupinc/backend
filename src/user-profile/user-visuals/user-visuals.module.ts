// user-visuals.module.ts
import { Module } from '@nestjs/common'
import { UserVisualsService } from './user-visuals.service'
import { UserVisualsResolver } from './user-visuals.resolver'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [HttpModule, ConfigModule],
    providers: [UserVisualsResolver, UserVisualsService],
    exports: [UserVisualsService], // Export the service if you want to use it in other modules
})
export class UserVisualsModule {}
