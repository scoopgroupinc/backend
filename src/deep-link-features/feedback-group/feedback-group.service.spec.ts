import { Test, TestingModule } from '@nestjs/testing'
import { FeedbackGroupService } from './feedback-group.service'

describe('FeedbackGroupService', () => {
    let service: FeedbackGroupService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FeedbackGroupService],
        }).compile()

        service = module.get<FeedbackGroupService>(FeedbackGroupService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
