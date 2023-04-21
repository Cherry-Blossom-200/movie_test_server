import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/auth-login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDTO: AuthLoginDTO): Promise<any>;
}
