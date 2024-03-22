import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty({ message: "Book's name is required" })
  @IsString({ message: "Book's name must be a string" })
  name: string;

  @IsNotEmpty({ message: "Book's description is required" })
  @IsString({ message: "Book's description must be a string" })
  description: string;

  @IsNotEmpty({ message: 'AuthorId is required' })
  @IsMongoId({ message: 'AuthorId must be a valid ObjectId' })
  authorId: string;
}
