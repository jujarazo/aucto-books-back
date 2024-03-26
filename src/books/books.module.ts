import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schemas/book.schema';
import { AuthorsModule } from 'src/authors/authors.module';
import { BooksEventsEmitter } from './books.events.emitter';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    AuthorsModule,
  ],
  providers: [BooksService, BooksEventsEmitter],
  controllers: [BooksController],
})
export class BooksModule {}
