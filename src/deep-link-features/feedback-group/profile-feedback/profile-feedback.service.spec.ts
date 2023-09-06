import { Test, TestingModule } from '@nestjs/testing'
import { ProfileFeedbackService } from './profile-feedback.service'

describe('ProfileFeedbackService', () => {
    let service: ProfileFeedbackService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProfileFeedbackService],
        }).compile()

        service = module.get<ProfileFeedbackService>(ProfileFeedbackService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
