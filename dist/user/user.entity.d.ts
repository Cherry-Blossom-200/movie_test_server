import { Movie } from 'src/movie/movie.entity';
export declare class User {
    user_id: number;
    created_date: Date;
    email: string;
    password: string;
    nickname: string;
    movies: Movie[];
}
