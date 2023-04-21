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
exports.MovieController = void 0;
const common_1 = require("@nestjs/common");
const create_movie_dto_1 = require("./dto/create-movie.dto");
const pubilc_metadata_1 = require("../auth/pubilc.metadata");
const movie_service_1 = require("./movie.service");
const movie_entity_1 = require("./movie.entity");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
let MovieController = class MovieController {
    constructor(movieService) {
        this.movieService = movieService;
    }
    createMovie(createMovieDTO) {
        const movie = new movie_entity_1.Movie();
        movie.genre = createMovieDTO.genre;
        movie.plot = createMovieDTO.plot;
        movie.release_date = createMovieDTO.release_date;
        movie.title = createMovieDTO.title;
        const result = this.movieService.create(movie);
        return (0, class_transformer_1.plainToInstance)(movie_entity_1.Movie, result);
    }
    getMovieById(movieId) {
        return this.movieService.findOneById(movieId);
    }
    getAllMovies() {
        return this.movieService.findAll();
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '영화를 새롭게 등록해요.' }),
    (0, swagger_1.ApiBody)({
        description: '이 형식대로 데이터를 보내주세요!',
        type: create_movie_dto_1.CreateMovieDTO,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '성공적 등록!',
        schema: {
            example: {
                title: '테스트 영화 3번',
                plot: '테스트 문장 3번',
                genre: '사극',
                release_date: '2023-03-31T15:00:00.000Z',
                user: {
                    user_id: 1,
                    created_date: '2023-04-21T02:55:12.084Z',
                    email: 'test@gmail.com',
                    nickname: 'testuser',
                },
                movie_id: 3,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '허용되지 않은 자의 접근',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_movie_dto_1.CreateMovieDTO]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "createMovie", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '영화를 1개만 가져와요.' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: '영화의 id를 입력해야해요',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '성공적!',
        schema: {
            example: {
                title: '테스트 영화 3번',
                plot: '테스트 문장 3번',
                genre: '사극',
                release_date: '2023-03-31T15:00:00.000Z',
                user: {
                    user_id: 1,
                    created_date: '2023-04-21T02:55:12.084Z',
                    email: 'test@gmail.com',
                    nickname: 'testuser',
                },
                movie_id: 3,
            },
        },
    }),
    (0, pubilc_metadata_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "getMovieById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '영화를 다 가져와요.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '성공적!',
        schema: {
            example: [
                {
                    title: '테스트 영화 2번',
                    plot: '테스트 문장 2번',
                    genre: '막장',
                    release_date: '2023-03-31T15:00:00.000Z',
                    user: {
                        user_id: 1,
                        created_date: '2023-04-21T02:55:12.084Z',
                        email: 'test@gmail.com',
                        nickname: 'testuser',
                    },
                    movie_id: 3,
                },
                {
                    title: '테스트 영화 3번',
                    plot: '테스트 문장 3번',
                    genre: '사극',
                    release_date: '2023-03-31T15:00:00.000Z',
                    user: {
                        user_id: 1,
                        created_date: '2023-04-21T02:55:12.084Z',
                        email: 'test@gmail.com',
                        nickname: 'testuser',
                    },
                    movie_id: 3,
                },
            ],
        },
    }),
    (0, pubilc_metadata_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "getAllMovies", null);
MovieController = __decorate([
    (0, swagger_1.ApiTags)('Movie'),
    (0, common_1.Controller)('movie'),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieController);
exports.MovieController = MovieController;
//# sourceMappingURL=movie.controller.js.map