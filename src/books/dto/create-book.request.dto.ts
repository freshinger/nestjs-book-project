import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookRequestDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  author: string;
  @IsNotEmpty()
  @IsNumber()
  publishedYear: number;
}
