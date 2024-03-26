import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { getModelToken } from '@nestjs/mongoose';

// Mock of the provider needed to run tests
const mockAuthorModel = {
  find: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue({}),
  create: jest.fn().mockResolvedValue({}),
};

describe('AuthorsService', () => {
  let service: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getModelToken('Author'),
          useValue: mockAuthorModel,
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
