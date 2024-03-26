import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from './interfaces/author.interface';
import { CreateAuthorDto } from './dto/create-author.dto';

type AuthorNameFilter = {
  name?: RegExp;
};
@Injectable()
export class AuthorsService {
  constructor(@InjectModel('Author') private authorModel: Model<Author>) {}

  async findAll(nameFilter: string): Promise<Author[]> {
    const filters: AuthorNameFilter = {};

    if (nameFilter) {
      filters.name = new RegExp(nameFilter, 'i');
    }

    return await this.authorModel.find(filters).exec();
  }

  async findOne(id: string): Promise<Author> {
    return await this.authorModel.findById(id).exec();
  }

  async create(createAuthor: CreateAuthorDto): Promise<Author> {
    // Check if author with the same name already exists
    const sameNameExists = await this.authorModel.findOne({
      name: createAuthor.name,
    });

    if (sameNameExists) {
      throw new BadRequestException('Author with this name already exists');
    }

    const createdAuthor = new this.authorModel(createAuthor);
    return await createdAuthor.save();
  }
}
