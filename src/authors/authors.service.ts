import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from './interfaces/author.interface';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel('Author') private authorModel: Model<Author>) {}

  async findAll(): Promise<Author[]> {
    return await this.authorModel.find().exec();
  }
}
