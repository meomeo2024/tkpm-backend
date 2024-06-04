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
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login to get access token'
  })
  @ApiResponse({
    status: 201,
    description: 'Login successfully'
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid password'
  })
  @ApiResponse({
    status: 404,
    description: `Email doesn't exist`
  })
  async login(@Body() body: LoginDto) {
    return this.userService.login(body);
  }

  @Post('register')
  @ApiOperation({
    summary: 'Register account'
  })
  @ApiResponse({
    status: 201,
    description: 'Register successfully'
  })
  @ApiResponse({
    status: 400,
    description: 'email must be an email'
  })
  @ApiResponse({
    status: 409,
    description: `Email already exists in the system`
  })
  async register(@Body() body: RegisterDto) {
    return this.userService.register(body);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOperation({
    summary: `Get user's profile`
  })
  @ApiResponse({
    status: 200,
    description: 'Get profile successfully'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  async getUser(@Request() req) {
    return this.userService.getProfile(req.user.id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post('refresh-token')
  @ApiOperation({
    summary: `Refresh token`
  })
  @ApiResponse({
    status: 201,
    description: 'Refresh token successfully'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  async refreshToken(@Request() req){
    return this.userService.refreshToken(req.user);
  }
}
