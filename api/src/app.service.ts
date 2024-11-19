import { Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookDto } from './app.controller';



@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>
  ) {}

  getHello(): string {
    return 'Hello Kristin!';
  }

  async createBook(book: BookDto) {
    // console.log('book', book)
    return await this.bookRepository.save(book)
  }
}
