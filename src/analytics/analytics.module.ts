// analytics.module.ts
import { Module } from '@nestjs/common'
import { AnalyticsService } from './analytics.service'

@Module({
    providers: [AnalyticsService],
    exports: [AnalyticsService], // Export if you want to use it in other modules
})
export class AnalyticsModule {}
