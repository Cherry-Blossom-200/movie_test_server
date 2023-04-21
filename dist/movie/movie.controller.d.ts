import { CreateMovieDTO } from './dto/create-movie.dto';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
export declare class MovieController {
    private movieService;
    constructor(movieService: MovieService);
    createMovie(createMovieDTO: CreateMovieDTO): Movie;
    getMovieById(movieId: number): Promise<Movie>;
    getAllMovies(): Promise<Movie[]>;
}
