import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { Salt, SecretKey } from 'src/constant/constant';
import { JwtService } from '@nestjs/jwt';
import { first } from 'rxjs';
@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(body: LoginDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: body.email,
        },
      });
      if (!user) {
        return new NotFoundException('Email does not exist');
      }
      const isMatch = await bcrypt.compare(body.password, user.password);
      if (isMatch) {
        const payload = { email: user.email, id: user.id };
        return {
          access_token: await this.jwtService.sign(payload, {
            secret: SecretKey,
            expiresIn: 60 * 60,
          }),
        };
      }
      return new UnauthorizedException('Password is invalid');
    } catch (error) {
      throw error;
    }
  }

  async register(body: RegisterDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: body.email,
        },
      });
      if (!user) {
        const hashPassword = await bcrypt.hash(body.password, Salt);
        const user = await this.userRepository.save({
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: hashPassword,
          createdDate: new Date().toLocaleString(),
        });
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          createDate: user.createdDate
        }
      } else throw new ConflictException('Email already exists in system.');
    } catch (error) {
      throw error;
    }
  }

  async getProfile(id : number) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: id
        },

      });
      return {
        email: user.email,
        id: id,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    } catch (error) {
      
    }
  }
}
