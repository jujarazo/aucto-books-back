import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksEventsEmitter } from './books.events.emitter';

// Mock of the provider needed to run tests
const mockBooksService = {
  find: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue({}),
  create: jest.fn().mockResolvedValue({}),
};

const mockBooksEventsEmitter = {
  emit: jest.fn(),
};

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        { provide: BooksService, useValue: mockBooksService },
        { provide: BooksEventsEmitter, useValue: mockBooksEventsEmitter },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
