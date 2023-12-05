// analytics.service.ts
import { Injectable } from '@nestjs/common'
import { Analytics } from '@segment/analytics-node'

@Injectable()
export class AnalyticsService {
    private analytics: Analytics

    constructor() {
        this.analytics = new Analytics('CfIgUtGMMUsBx2wIx32roKAsr1LagL6I')
    }

    // Method to track events
    track(event: string, userId: string, properties?: object) {
        this.analytics.track({
            event,
            userId,
            properties,
        })
    }
}
