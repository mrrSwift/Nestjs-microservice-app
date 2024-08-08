import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { UserInter } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async current(userID:string):Promise<UserInter> {
    return await this.UserModel.findById(userID).select('email fullName');
  }
  
}










