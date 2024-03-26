import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { AuthorsService } from 'src/authors/authors.service';
import { BooksEventsEmitter } from './books.events.emitter';

// Mocks of the providers needed to run tests
const mockAuthorsService = {
  findOne: jest
    .fn()
    .mockImplementation((id) => Promise.resolve({ id, name: 'Author Name' })),
};

const mockBookModel = {
  find: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue({}),
  create: jest.fn().mockResolvedValue({}),
};

const mockBooksEventsEmitter = {
  emit: jest.fn(),
};

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: 'BookModel', useValue: mockBookModel }, // Mock for BookModel
        { provide: AuthorsService, useValue: mockAuthorsService }, // Your existing mock
        { provide: BooksEventsEmitter, useValue: mockBooksEventsEmitter }, // Mock for BooksEventsEmitter
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
