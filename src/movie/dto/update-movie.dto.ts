import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateMovieDTO {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly plot?: string;

  @IsString()
  @IsOptional()
  readonly genre?: string;

  @IsDateString()
  @IsOptional()
  readonly release_date?: Date;
}
