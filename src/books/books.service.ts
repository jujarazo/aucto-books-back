import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './interfaces/book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthorsService } from 'src/authors/authors.service';
import { BooksEventsEmitter } from './books.events.emitter';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Book') private readonly bookModel: Model<Book>,
    private readonly authorsService: AuthorsService,
    private readonly booksEventEmitter: BooksEventsEmitter,
  ) {}

  async findAll(withAuthorName = false): Promise<Book[]> {
    if (withAuthorName) {
      // Aggregate the author name to the book response to show in the FE
      return await this.bookModel.aggregate([
        {
          $lookup: {
            from: 'authors',
            localField: 'authorId',
            foreignField: '_id',
            as: 'authorInfo',
          },
        },
        {
          $unwind: '$authorInfo',
        },
        {
          $project: {
            name: 1,
            description: 1,
            authorId: 1,
            authorName: '$authorInfo.name',
          },
        },
      ]);
    }

    return await this.bookModel.find().exec();
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const authorExists = await this.authorsService.findOne(
      createBookDto.authorId,
    );

    if (!authorExists) {
      throw new NotFoundException(
        `Author with ID ${createBookDto.authorId} not found`,
      );
    }

    const createdBook = new this.bookModel(createBookDto);

    this.booksEventEmitter.emitBookCreatedEvent();

    return await createdBook.save();
  }
}
