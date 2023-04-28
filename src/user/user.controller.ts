import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { plainToInstance } from 'class-transformer';
import { Public } from 'src/auth/pubilc.metadata';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @ApiOperation({ summary: '사용자를 새롭게 등록해요! (회원가입)' })
  @ApiBody({
    description: '이 형식대로 데이터를 보내주세요!',
    type: CreateUserDTO,
  })
  @ApiResponse({
    status: 200,
    description: '성공적 등록!',
    schema: {
      example: {
        email: 'test@gmail.com',
        password: '$2b$10$Z07vX61kh5--------.....',
        nickname: 'testuser',
        user_id: 1,
        created_date: '2023-04-21T02:55:12.084Z',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: '허용되지 않은 자의 접근',
  })
  @Public()
  @Post()
  createNewUser(@Body() createUserDTO: CreateUserDTO) {
    const user = new User();
    user.email = createUserDTO.email;
    user.nickname = createUserDTO.nickname;
    user.password = createUserDTO.password;
    return this.userService.create(user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '사용자의 id를 기반으로 자세한 정보를 검색해요' })
  @ApiResponse({
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
  })
  @ApiResponse({
    status: 401,
    description: '허용되지 않은 자의 접근!',
  })
  @Get(':id')
  getUserById(@Param('id') userId: number) {
    return plainToInstance(User, this.userService.findOneByUserId(userId));
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '사용자의 id를 기반으로 삭제해줘요' })
  @ApiResponse({
    status: 200,
    description: '성공적 삭제!!',
  })
  @ApiResponse({
    status: 401,
    description: '허용되지 않은 자의 접근!',
  })
  @Delete(':id')
  deleteUserById(@Param('id') userId: number) {
    return this.userService.remove(userId);
  }
}
