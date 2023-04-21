import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDTO {
  @ApiProperty({
    example: '스타워즈',
    description: '제목을 적어주세요. 중복 허용',
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: '내가 니 아빠다',
    description: '줄거리를 적어주세요!',
  })
  @IsString()
  @IsNotEmpty()
  readonly plot: string;

  @ApiProperty({
    example: '드라마',
    description: '장르를 적어주시되, 하나만 적어주세요 (업데이트 예정)',
  })
  @IsString()
  readonly genre: string;

  @ApiProperty({
    example: '2023-09-25',
    description: '개봉일자를 년-월-도 형식으로 적어주세요. 위에껀 내 생일 :)',
  })
  @IsDateString()
  readonly release_date: Date;
}
