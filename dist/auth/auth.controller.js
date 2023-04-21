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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const pubilc_metadata_1 = require("./pubilc.metadata");
const auth_login_dto_1 = require("./dto/auth-login.dto");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(loginDTO) {
        return this.authService.login(loginDTO.email, loginDTO.password);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '로그인이에요!' }),
    (0, swagger_1.ApiBody)({
        description: '이 형식대로 데이터를 보내주세요!',
        type: auth_login_dto_1.AuthLoginDTO,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '로그인 성공! JWT 토큰을 반환하고, 이는 인증이 필요한 모든 API에서 Header -> Bearer 토큰에 무조건 포함이 되어있어야만 해요! 인증이 필요한 API는 옆에 자물쇠 모양이 있어요. 토큰은 10분만 유효해요! 자세한 건 문의를 주거나 검색해보세요:)',
        schema: {
            example: {
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwic3ViIjoxLCJpYXQiOjE2ODIwNzgxMTcsImV4cCI6MTY4MjA3ODcxN30.FndRgzHFhCym-ZSHl9A55-XgEZr55PhXE780l_qPwhc',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '로그인 정보 틀림!',
        schema: {
            example: {
                statusCode: 401,
                message: 'Unauthorized',
            },
        },
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, pubilc_metadata_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_login_dto_1.AuthLoginDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map