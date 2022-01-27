import { Controller, Get, Post, Delete, Put, Param, Req, Body, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Request } from 'express';
import { BookDto } from './book.dto';
import { Book } from './book.entity';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('book')
@Controller('books')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
export class BooksController {
  constructor(private booksService: BooksService) {}

  /**
   *
   * @param {Request} Devuelve una lista de libros
   * @returns {Book[]} request Lista de parámetros para filtrar
   */
  @Get()
  @ApiOperation({ summary: 'Obtener lista de libros' })
  @ApiResponse({
    status: 201,
    description: 'Lista de Libros',
    type: Book,
  })
  findAll(@Req() request: Request): Promise<Book[]> {
    console.log(request.query);
    return this.booksService.findAll(request.query);
  }

  @Get(':bookId')
  findBook(@Param('bookId') bookId: string): Promise<Book> {
    return this.booksService.findBook(bookId);
  }

  @Post()
  createBook(@Body() newBook: BookDto): Promise<Book> {
    return this.booksService.createBook(newBook);
  }

  @Delete(':bookId')
  deleteBook(@Param('bookId') bookId: string): Promise<Book> {
    return this.booksService.deleteBook(bookId);
  }

  @Put(':bookId')
  updateBook(
    @Param('bookId') bookId: string,
    @Body() newBook: BookDto,
  ): Promise<Book> {
    return this.booksService.updateBook(bookId, newBook);
  }
}
