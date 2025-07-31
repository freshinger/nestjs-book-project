import { IsNotEmpty } from 'class-validator';

export class CreateBookResponseDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  author: string;
  @IsNotEmpty()
  publishedYear: number;
}
