import { Injectable } from '@nestjs/common';
import { CreateBookRequestDto } from './dto/create-book.request.dto';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateBookResponseDto } from './dto/create-book.response.dto';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private repo: Repository<Book>) {}

  async create(createBookDto: CreateBookRequestDto) {
    const id = uuidv4();
    const book = {
      ...createBookDto,
      id,
    };
    await this.repo.save(book);
    // eslint-disable-next-line
    return plainToInstance(CreateBookResponseDto, book);
  }

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: CreateBookRequestDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
