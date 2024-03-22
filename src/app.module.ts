import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [DatabaseModule, AuthorsModule, BooksModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
