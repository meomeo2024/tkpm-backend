import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.userService.login(body);
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.userService.register(body);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getUser(@Request() req) {
    return req?.user;
  }
}
