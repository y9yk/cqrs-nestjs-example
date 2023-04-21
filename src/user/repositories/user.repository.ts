import { Injectable } from '@nestjs/common';
import { Repository } from 'src/common/repositories/repository';
import { User } from '../../common/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SERVICE_DB_CONNECTION_NAME } from 'src/common/constants';

@Injectable()
export class UserRepository extends Repository<User> {
  // inject model to repository class
  constructor(
    @InjectModel(User.name, SERVICE_DB_CONNECTION_NAME)
    private entity: Model<User>,
  ) {
    super(entity);
  }
}
