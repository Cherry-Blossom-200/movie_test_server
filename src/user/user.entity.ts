import { Exclude } from 'class-transformer';
import { Movie } from 'src/movie/movie.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @CreateDateColumn()
  created_date: Date;

  @Column({ unique: true })
  email: string;

  // Excludes `password` property from responses
  @Exclude()
  @Column()
  password: string;

  @Column()
  nickname: string;

  @OneToMany(() => Movie, (movie) => movie.user)
  movies: Movie[];
}
