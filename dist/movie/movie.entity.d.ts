import { User } from 'src/user/user.entity';
export declare class Movie {
    movie_id: number;
    title: string;
    plot: string;
    genre: string;
    release_date: Date;
    user: User;
}
