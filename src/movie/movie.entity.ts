import { Exclude } from 'class-transformer';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  movie_id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  plot: string;

  @Column()
  genre: string;

  @CreateDateColumn()
  release_date: Date;

  @ManyToOne(() => User, (user) => user.movies)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
