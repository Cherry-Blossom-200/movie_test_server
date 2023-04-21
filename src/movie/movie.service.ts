import {
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable({ scope: Scope.REQUEST })
export class MovieService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly userService: UserService,
  ) {}

  async create(movie: Movie): Promise<Movie | null> {
    const user = await this.userService.findOneByEmail(
      this.request['user'].email,
    );
    const newMovie = await this.movieRepository.create(movie);
    newMovie.user = user;
    return this.movieRepository.save(newMovie);
  }

  findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  findOneById(movieId: number): Promise<Movie | null> {
    return this.movieRepository.findOneBy({ movie_id: movieId });
  }

  /**
   * TODO : FIX THE ERROR
   * @param movieId
   * @param moviePayload
   */
  async update(movieId: number, moviePayload: Movie): Promise<void> {
    const existingMovie = await this.movieRepository.findOneBy({
      movie_id: movieId,
    });

    console.log(existingMovie);

    if (
      !existingMovie ||
      existingMovie.user.email !== this.request['user'].email
    ) {
      throw new UnauthorizedException();
    }

    await this.movieRepository.update(movieId, moviePayload);
  }

  async delete(movieId: number): Promise<void> {
    const existingMovie = await this.movieRepository.findOneBy({
      movie_id: movieId,
    });

    if (
      !existingMovie ||
      existingMovie.user.email !== this.request['user'].email
    ) {
      throw new UnauthorizedException();
    }

    await this.movieRepository.delete(movieId);
  }
}
