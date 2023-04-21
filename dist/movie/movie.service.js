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
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const movie_entity_1 = require("./movie.entity");
const typeorm_2 = require("typeorm");
const core_1 = require("@nestjs/core");
const user_service_1 = require("../user/user.service");
let MovieService = class MovieService {
    constructor(request, movieRepository, userService) {
        this.request = request;
        this.movieRepository = movieRepository;
        this.userService = userService;
    }
    async create(movie) {
        const user = await this.userService.findOneByEmail(this.request['user'].email);
        const newMovie = await this.movieRepository.create(movie);
        newMovie.user = user;
        return this.movieRepository.save(newMovie);
    }
    findAll() {
        return this.movieRepository.find();
    }
    findOneById(movieId) {
        return this.movieRepository.findOneBy({ movie_id: movieId });
    }
    async update(movieId, moviePayload) {
        const existingMovie = await this.movieRepository.findOneBy({
            movie_id: movieId,
        });
        console.log(existingMovie);
        if (!existingMovie ||
            existingMovie.user.email !== this.request['user'].email) {
            throw new common_1.UnauthorizedException();
        }
        await this.movieRepository.update(movieId, moviePayload);
    }
    async delete(movieId) {
        const existingMovie = await this.movieRepository.findOneBy({
            movie_id: movieId,
        });
        if (!existingMovie ||
            existingMovie.user.email !== this.request['user'].email) {
            throw new common_1.UnauthorizedException();
        }
        await this.movieRepository.delete(movieId);
    }
};
MovieService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __param(1, (0, typeorm_1.InjectRepository)(movie_entity_1.Movie)),
    __metadata("design:paramtypes", [Object, typeorm_2.Repository,
        user_service_1.UserService])
], MovieService);
exports.MovieService = MovieService;
//# sourceMappingURL=movie.service.js.map