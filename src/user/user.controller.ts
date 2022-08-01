import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserByEmail(@Query('email') email: string) {
    const user = await this.userService.findUserByEmail(email);
    return user;
  }
}
