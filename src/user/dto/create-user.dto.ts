import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    example: 'juwonkim@gmail.com',
    description: '이메일을 적어주세요. 이미 사용한 값은 사용 못합니다~~',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'juwonkim',
    description: '원하는 닉네임을 넣어주세요. 중복 허용!',
  })
  @IsAlphanumeric()
  @IsNotEmpty()
  readonly nickname: string;

  //@IsStrongPassword()
  @ApiProperty({
    example: 'mystrongpassword',
    description: '비밀번호 적어줘요.',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
