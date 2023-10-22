import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { AppleService } from './apple.service' // adjust the path to your service accordingly

@Module({
    imports: [HttpModule], // add HttpModule here
    providers: [AppleService],
    exports: [AppleService], // only if you want to use it in other modules
})
export class AppleModule {} // or whichever module you're working in
