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

  async getBooks() {
    return await this.bookRepository.find({
      order: {
        id: "ASC", //can also order by title or author, for ex. title: "ASC"
      }
    });
  }

  async getBook(id: number) {
    return await this.bookRepository.findOneBy({id})
  }

  async createBook(book: BookDto) {
    // console.log('book', book)
    await this.bookRepository.save(book);
    return await this.getBooks(); //return new book and list of books
  }

  async updateBook(id: number, book: BookDto) {
    // console.log('Book', book);
    await this.bookRepository.update(id, book);
    return await this.getBooks();
  }

  async deleteBook(id: number) {
    await this.bookRepository.delete(id)
    return await this.getBooks();
  }
}
