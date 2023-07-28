import { Test, TestingModule } from '@nestjs/testing';
import { PersonalityFeedbackService } from './personality-feedback.service';

describe('PersonalityFeedbackService', () => {
  let service: PersonalityFeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalityFeedbackService],
    }).compile();

    service = module.get<PersonalityFeedbackService>(PersonalityFeedbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
