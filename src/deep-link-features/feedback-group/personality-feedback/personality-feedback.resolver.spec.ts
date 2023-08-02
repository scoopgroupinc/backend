import { Test, TestingModule } from '@nestjs/testing';
import { PersonalityFeedbackResolver } from './personality-feedback.resolver';

describe('PersonalityFeedbackResolver', () => {
  let resolver: PersonalityFeedbackResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalityFeedbackResolver],
    }).compile();

    resolver = module.get<PersonalityFeedbackResolver>(PersonalityFeedbackResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
