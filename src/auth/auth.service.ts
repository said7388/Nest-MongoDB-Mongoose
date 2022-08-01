import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createUser(body: CreateAuthDto) {
    const { email, firstName, lastName, password } = body;
    const existUser = await this.userService.findUserByEmail(email);
    if (existUser.length === 0) {
      const result = await this.userService.createNewUser(
        firstName,
        lastName,
        email,
        password,
      );
      const profile = {
        id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
      };
      const accessToken = await this.jwtService.sign(profile);
      return { profile, accessToken };
    } else {
      throw new BadRequestException('email already taken');
    }
  }
}
