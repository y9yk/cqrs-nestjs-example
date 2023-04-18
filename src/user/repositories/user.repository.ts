import { Injectable } from '@nestjs/common';
import { Repository } from 'src/common/repositories/repository';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends Repository<User> {
  // inject model to repository class
  constructor(@InjectModel(User.name) private entity: Model<User>) {
    super(entity);
  }
}
