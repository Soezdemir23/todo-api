import { IsDate, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @MaxLength(15, { message: 'Maximum length is 15 characters' })
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @MaxLength(2000, { message: 'Maximum length is 2000 characters' })
  notes: string;

  @IsDate()
  @IsOptional()
  createdDate: Date;
}
