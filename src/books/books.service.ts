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

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: string): Promise<boolean | CreateBookResponseDto> {
    const book = await this.repo.findOne({ where: { id } });
    if (book === null) return false;
    // eslint-disable-next-line
    return plainToInstance(CreateBookResponseDto, book);
  }

  async update(
    id: string,
    updateBookDto: CreateBookRequestDto,
  ): Promise<boolean | CreateBookResponseDto> {
    try {
      const book = await this.repo.findOne({ where: { id } });
      if (book === null) return false;
      await this.repo.update({ id }, { ...updateBookDto, id });
    } catch (error) {
      console.log(error);
    }
    const updated = await this.repo.findOne({ where: { id } });
    // eslint-disable-next-line
    return plainToInstance(CreateBookResponseDto, updated);
  }

  async remove(id: string): Promise<boolean> {
    try {
      const book = await this.repo.findOne({ where: { id } });
      if (book === null) return false;
      const deleted = await this.repo.delete({ id });
      if (deleted && deleted.affected && deleted.affected > 0) return true;
    } catch (error) {
      console.log(error);
    }
    return true;
  }
}
