import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

export type BookDto = {
  title: string;
  author: string;
  genre: string;
  price: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('book')
  createBook(@Body() book: BookDto) {
    // console.log('book', book)
    return this.appService.createBook(book)
  }
}
