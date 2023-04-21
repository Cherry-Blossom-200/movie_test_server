import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './pubilc.metadata';
import { AuthLoginDTO } from './dto/auth-login.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '로그인이에요!' })
  @ApiBody({
    description: '이 형식대로 데이터를 보내주세요!',
    type: AuthLoginDTO,
  })
  @ApiResponse({
    status: 200,
    description:
      '로그인 성공! JWT 토큰을 반환하고, 이는 인증이 필요한 모든 API에서 Header -> Bearer 토큰에 무조건 포함이 되어있어야만 해요! 인증이 필요한 API는 옆에 자물쇠 모양이 있어요. 토큰은 10분만 유효해요! 자세한 건 문의를 주거나 검색해보세요:)',
    schema: {
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwic3ViIjoxLCJpYXQiOjE2ODIwNzgxMTcsImV4cCI6MTY4MjA3ODcxN30.FndRgzHFhCym-ZSHl9A55-XgEZr55PhXE780l_qPwhc',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: '로그인 정보 틀림!',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  login(@Body() loginDTO: AuthLoginDTO) {
    return this.authService.login(loginDTO.email, loginDTO.password);
  }
}
