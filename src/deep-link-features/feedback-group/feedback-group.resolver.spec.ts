import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackGroupResolver } from './feedback-group.resolver';

describe('FeedbackGroupResolver', () => {
  let resolver: FeedbackGroupResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackGroupResolver],
    }).compile();

    resolver = module.get<FeedbackGroupResolver>(FeedbackGroupResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
