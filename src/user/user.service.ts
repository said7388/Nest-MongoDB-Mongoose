import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcriptjs from 'bcryptjs';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}

  async createNewUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    const salt: string = await bcriptjs.genSalt();
    const hashPassword = bcriptjs.hashSync(password, salt);
    const newUser = new this.userModel({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    const result = await newUser.save();
    return result;
  }

  async findUserByEmail(email: string) {
    const existUser = await this.userModel.find({ email: email });
    return existUser;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
