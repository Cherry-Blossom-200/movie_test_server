"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const core_1 = require("@nestjs/core");
let UserService = class UserService {
    constructor(request, userRepository) {
        this.request = request;
        this.userRepository = userRepository;
    }
    async create(user) {
        const existingUser = await this.userRepository.findOneBy({
            email: user.email,
        });
        if (existingUser) {
            throw new common_1.HttpException('Email already in use', common_1.HttpStatus.BAD_REQUEST);
        }
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
        user.password = hashedPassword;
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }
    async findOneByEmail(email) {
        return this.userRepository.findOneBy({ email });
    }
    async findOneByUserId(user_id) {
        const existingUser = await this.userRepository.findOneBy({ user_id });
        if (!existingUser || this.request['user'].email !== existingUser.email) {
            throw new common_1.UnauthorizedException();
        }
        return existingUser;
    }
    async remove(user_id) {
        const existingUser = await this.userRepository.findOneBy({ user_id });
        if (!existingUser || this.request['user'].email !== existingUser.email) {
            throw new common_1.UnauthorizedException();
        }
        await this.userRepository.delete(user_id);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object, typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map