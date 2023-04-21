import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { GetUsersRequestDto } from '../dto/user.request.dto';
import { getFilterQuery, getSortQuery } from 'src/common/query.dispatcher';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUsers(dto: GetUsersRequestDto): Promise<UserDto[]> {
    // get params
    const { name, email, page, size, sortField, sortOrder } = dto;
    // create query
    const filter = getFilterQuery({
      name,
      email,
    });
    const options = {
      skip: (page - 1) * size,
      limit: size,
      sort: getSortQuery(sortField, sortOrder),
    };
    // get users and return it
    const users = await this.userRepository.find(filter, options);
    return users.map((user) => {
      const { name, email, deleted, createdAt } = user;
      return {
        name,
        email,
        deleted,
        createdAt,
      };
    });
  }
}
