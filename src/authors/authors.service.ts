import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from './interfaces/author.interface';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel('Author') private authorModel: Model<Author>) {}

  async findAll(): Promise<Author[]> {
    return await this.authorModel.find().exec();
  }

  async create(createAuthor: CreateAuthorDto): Promise<Author> {
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
