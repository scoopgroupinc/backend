import { Test, TestingModule } from '@nestjs/testing'
import { UserLinkResolver } from './user-link.resolver'

describe('UserLinkResolver', () => {
    let resolver: UserLinkResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserLinkResolver],
        }).compile()

        resolver = module.get<UserLinkResolver>(UserLinkResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
