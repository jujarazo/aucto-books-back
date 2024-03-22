import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './interfaces/book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Book') private readonly bookModel: Model<Book>,
    private readonly authorsService: AuthorsService,
  ) {}

  async findAll(): Promise<Book[]> {
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
    return await createdBook.save();
  }
}
