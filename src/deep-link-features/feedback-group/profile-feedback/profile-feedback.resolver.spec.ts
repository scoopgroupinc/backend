import { Test, TestingModule } from '@nestjs/testing'
import { ProfileFeedbackResolver } from './profile-feedback.resolver'

describe('ProfileFeedbackResolver', () => {
    let resolver: ProfileFeedbackResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProfileFeedbackResolver],
        }).compile()

        resolver = module.get<ProfileFeedbackResolver>(ProfileFeedbackResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
