import { Test, TestingModule } from '@nestjs/testing'
import { UserLinkService } from './user-link.service'

describe('UserLinkService', () => {
    let service: UserLinkService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserLinkService],
        }).compile()

        service = module.get<UserLinkService>(UserLinkService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
