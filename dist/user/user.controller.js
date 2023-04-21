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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
const class_transformer_1 = require("class-transformer");
const pubilc_metadata_1 = require("../auth/pubilc.metadata");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    createNewUser(createUserDTO) {
        const user = new user_entity_1.User();
        user.email = createUserDTO.email;
        user.nickname = createUserDTO.nickname;
        user.password = createUserDTO.password;
        return this.userService.create(user);
    }
    getUserById(userId) {
        return (0, class_transformer_1.plainToInstance)(user_entity_1.User, this.userService.findOneByUserId(userId));
    }
    deleteUserById(userId) {
        return this.userService.remove(userId);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '사용자를 새롭게 등록해요! (회원가입)' }),
    (0, swagger_1.ApiBody)({
        description: '이 형식대로 데이터를 보내주세요!',
        type: create_user_dto_1.CreateUserDTO,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '성공적 등록!',
        schema: {
            example: {
                email: 'test@gmail.com',
                password: '$2b$10$Z07vX61kh5r4KaDQmWLRI.IlCxFIWqUaJACPnep7xHmONfnHFUimS',
                nickname: 'testuser',
                user_id: 1,
                created_date: '2023-04-21T02:55:12.084Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '허용되지 않은 자의 접근',
    }),
    (0, pubilc_metadata_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createNewUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '사용자의 id를 기반으로 자세한 정보를 검색해요' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '성공적!',
        schema: {
            example: {
                user_id: 5,
                created_date: '2023-04-20T23:03:13.2ㄴ9Z',
                email: 'kcdevdes@gmail.com',
                nickname: 'kcdevdes001',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '허용되지 않은 자의 접근!',
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '사용자의 id를 기반으로 삭제해줘요' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '성공적 삭제!!',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '허용되지 않은 자의 접근!',
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUserById", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map