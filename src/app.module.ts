import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [DatabaseModule, AuthorsModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
