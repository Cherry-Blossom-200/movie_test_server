import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
export declare class UserService {
    private readonly request;
    private userRepository;
    constructor(request: Request, userRepository: Repository<User>);
    create(user: User): Promise<User | null>;
    findOneByEmail(email: string): Promise<User | null>;
    findOneByUserId(user_id: number): Promise<User | null>;
    remove(user_id: number): Promise<void>;
}
