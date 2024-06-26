import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Sse,
  MessageEvent,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './interfaces/book.interface';
import { Observable } from 'rxjs';
import { BooksEventsEmitter } from './books.events.emitter';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly booksEventEmitter: BooksEventsEmitter,
  ) {}

  @Get()
  async findAll(@Query('withAuthorName') withAuthorName?: string) {
    const withAuthorNameBool = withAuthorName === '1';
    return this.booksService.findAll(withAuthorNameBool);
  }

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Sse('subscribe')
  subscribeToBooks(): Observable<MessageEvent> {
    return new Observable((subscriber) => {
      // Create a listener function to send a message to the subscribed clients
      const listener = () => {
        subscriber.next({ data: 'Book created' });
      };

      // Subscribe to the 'bookCreated' event
      this.booksEventEmitter.subscribeToBookCreatedEvent(listener);

      // Return a cleanup function to remove the listener when the client unsubscribes
      return () => {
        this.booksEventEmitter.unsubscribeFromBookCreatedEvent(listener);
      };
    });
  }
}
