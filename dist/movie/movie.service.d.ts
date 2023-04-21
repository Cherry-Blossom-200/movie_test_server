import { Movie } from './movie.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
export declare class MovieService {
    private readonly request;
    private readonly movieRepository;
    private readonly userService;
    constructor(request: Request, movieRepository: Repository<Movie>, userService: UserService);
    create(movie: Movie): Promise<Movie | null>;
    findAll(): Promise<Movie[]>;
    findOneById(movieId: number): Promise<Movie | null>;
    update(movieId: number, moviePayload: Movie): Promise<void>;
    delete(movieId: number): Promise<void>;
}
