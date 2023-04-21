import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDTO {
  @ApiProperty({
    example: 'juwonkim@gmail.com',
    description: '이메일을 적어주세요',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'Supercalifragilisticexpialidocious',
    description: '비밀번호 적어주세요 https://youtu.be/1Pu1adxqUAg',
  })
  //@IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
