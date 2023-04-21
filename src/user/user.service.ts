import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User | null> {
    // Checks if there has been a user possessing the same email
    const existingUser = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (existingUser) {
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    }

    /** PASSWORD ENCRYPTION */
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
    user.password = hashedPassword;
    /***********/

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async findOneByUserId(user_id: number): Promise<User | null> {
    const existingUser = await this.userRepository.findOneBy({ user_id });

    if (!existingUser || this.request['user'].email !== existingUser.email) {
      throw new UnauthorizedException();
    }

    return existingUser;
  }

  async remove(user_id: number): Promise<void> {
    const existingUser = await this.userRepository.findOneBy({ user_id });

    if (!existingUser || this.request['user'].email !== existingUser.email) {
      throw new UnauthorizedException();
    }

    await this.userRepository.delete(user_id);
  }
}
