import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailPasswordQuery } from '../impl';
import { UserRepository } from 'src/user/repositories/user.repository';

@QueryHandler(GetUserByEmailPasswordQuery)
export class GetUserByEmailPasswordHandler
  implements IQueryHandler<GetUserByEmailPasswordQuery>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByEmailPasswordQuery) {
    // create filter query
    const filterQuery = {
      email: query.email,
      password: query.password,
    };
    return await this.userRepository.find(filterQuery);
  }
}
