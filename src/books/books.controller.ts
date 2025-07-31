import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  Put,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookRequestDto } from './dto/create-book.request.dto';

@Controller('books')
@UseInterceptors(ClassSerializerInterceptor)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookRequestDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const book = await this.booksService.findOne(id);
    if (!book) throw new NotFoundException('book not found');
    return book;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: CreateBookRequestDto,
  ) {
    const updated = await this.booksService.update(id, updateBookDto);
    if (!updated) {
      throw new NotFoundException('book not found');
    }
    return updated;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const deleted = await this.booksService.remove(id);
    if (!deleted) {
      throw new NotFoundException('book not found');
    }
  }
}
