import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
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

 @Get('book')
 async getBooks() {
  return await this.appService.getBooks();
 } 

 @Get('book/:id')
 async getBook(@Param('id') id: number) {
  return await this.appService.getBook(id);
 }

  @Post('book')
  createBook(@Body() book: BookDto) {
    // console.log('POST book', book)
    // throw new Error('fake error')
    return this.appService.createBook(book)
  }

  @Put('/book/:id')
  async updateBook(@Body() book: BookDto, @Param('id') id:number) {
    console.log('PUT book route', book);
    // console.log('id', id)
  return await this.appService.updateBook(id, book);
  }
  
  @Delete('book/:id')
  async deleteBook(@Param('id') id:number) {
    // console.log('BOOK ID', id);
  return await this.appService.deleteBook(id);  
  }
  
}
