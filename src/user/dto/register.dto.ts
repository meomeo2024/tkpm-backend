import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: '22880221@student.hcmus.edu.vn'
  })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({
    example: 'Pass@123456'
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Pham'
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Hau'
  })
  lastName: string;
}
