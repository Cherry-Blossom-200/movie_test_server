import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { Public } from 'src/auth/pubilc.metadata';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { plainToInstance } from 'class-transformer';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '영화를 새롭게 등록해요.' })
  @ApiBody({
    description: '이 형식대로 데이터를 보내주세요!',
    type: CreateMovieDTO,
  })
  @ApiResponse({
    status: 200,
    description: '성공적 등록!',
    schema: {
      example: {
        title: '테스트 영화 3번',
        plot: '테스트 문장 3번',
        genre: '사극',
        release_date: '2023-03-31T15:00:00.000Z',
        user: {
          user_id: 1,
          created_date: '2023-04-21T02:55:12.084Z',
          email: 'test@gmail.com',
          nickname: 'testuser',
        },
        movie_id: 3,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: '허용되지 않은 자의 접근',
  })
  @Post()
  createMovie(@Body() createMovieDTO: CreateMovieDTO) {
    const movie = new Movie();
    movie.genre = createMovieDTO.genre;
    movie.plot = createMovieDTO.plot;
    movie.release_date = createMovieDTO.release_date;
    movie.title = createMovieDTO.title;
    const result = this.movieService.create(movie);
    return plainToInstance(Movie, result);
  }

  @ApiOperation({ summary: '영화를 1개만 가져와요.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '영화의 id를 입력해야해요',
  })
  @ApiResponse({
    status: 200,
    description: '성공적!',
    schema: {
      example: {
        title: '테스트 영화 3번',
        plot: '테스트 문장 3번',
        genre: '사극',
        release_date: '2023-03-31T15:00:00.000Z',
        user: {
          user_id: 1,
          created_date: '2023-04-21T02:55:12.084Z',
          email: 'test@gmail.com',
          nickname: 'testuser',
        },
        movie_id: 3,
      },
    },
  })
  @Public()
  @Get(':id')
  getMovieById(@Param('id') movieId: number) {
    return this.movieService.findOneById(movieId);
  }

  @ApiOperation({ summary: '영화를 다 가져와요.' })
  @ApiResponse({
    status: 200,
    description: '성공적!',
    schema: {
      example: [
        {
          title: '테스트 영화 2번',
          plot: '테스트 문장 2번',
          genre: '막장',
          release_date: '2023-03-31T15:00:00.000Z',
          user: {
            user_id: 1,
            created_date: '2023-04-21T02:55:12.084Z',
            email: 'test@gmail.com',
            nickname: 'testuser',
          },
          movie_id: 3,
        },
        {
          title: '테스트 영화 3번',
          plot: '테스트 문장 3번',
          genre: '사극',
          release_date: '2023-03-31T15:00:00.000Z',
          user: {
            user_id: 1,
            created_date: '2023-04-21T02:55:12.084Z',
            email: 'test@gmail.com',
            nickname: 'testuser',
          },
          movie_id: 3,
        },
      ],
    },
  })
  @Public()
  @Get()
  getAllMovies() {
    return this.movieService.findAll();
  }

  // @Put(':id')
  // updateMovieById(
  //   @Param('id') movieId: number,
  //   @Body() updateMovieDTO: UpdateMovieDTO,
  // ) {
  //   const movie = new Movie();
  //   if (updateMovieDTO.title) {
  //     movie.title = updateMovieDTO.title;
  //   }
  //   if (updateMovieDTO.plot) {
  //     movie.plot = updateMovieDTO.plot;
  //   }
  //   if (updateMovieDTO.release_date) {
  //     movie.release_date = updateMovieDTO.release_date;
  //   }
  //   if (updateMovieDTO.genre) {
  //     movie.genre = updateMovieDTO.genre;
  //   }
  //   return this.movieService.update(movieId, movie);
  // }

  // @Delete(':id')
  // deleteMovieById(@Param('id') movieId: number) {
  //   return this.movieService.delete(movieId);
  // }
}
