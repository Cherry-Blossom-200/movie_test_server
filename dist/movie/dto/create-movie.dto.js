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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMovieDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateMovieDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '스타워즈',
        description: '제목을 적어주세요. 중복 허용',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMovieDTO.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '내가 니 아빠다',
        description: '줄거리를 적어주세요!',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMovieDTO.prototype, "plot", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '드라마',
        description: '장르를 적어주시되, 하나만 적어주세요 (업데이트 예정)',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMovieDTO.prototype, "genre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-09-25',
        description: '개봉일자를 년-월-도 형식으로 적어주세요. 위에껀 내 생일 :)',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateMovieDTO.prototype, "release_date", void 0);
exports.CreateMovieDTO = CreateMovieDTO;
//# sourceMappingURL=create-movie.dto.js.map