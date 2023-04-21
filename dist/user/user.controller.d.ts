import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
export declare class UserController {
    readonly userService: UserService;
    constructor(userService: UserService);
    createNewUser(createUserDTO: CreateUserDTO): Promise<User>;
    getUserById(userId: number): User;
    deleteUserById(userId: number): Promise<void>;
}
