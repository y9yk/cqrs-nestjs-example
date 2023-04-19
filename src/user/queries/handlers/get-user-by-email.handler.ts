import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from '../impl';
import { UserRepository } from 'src/user/repositories/user.repository';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByEmailQuery) {
    // create filter query
    const filterQuery = {
      email: query.email,
    };
    return await this.userRepository.find(filterQuery);
  }
}
