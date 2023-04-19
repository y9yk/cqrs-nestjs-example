import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '../impl';
import { UserRepository } from 'src/user/repositories/user.repository';
import { QueryOptions } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUsersQuery) {
    // create query options
    const queryOptions: QueryOptions = {
      skip: query.page * query.size,
      limit: query.size,
    };
    // create sort option
    // It can be validated through using @IsIn annotation in DTO
    const { sortField, sortOrder } = query;
    if (sortField && sortOrder) {
      const sort = {};
      sort[query.sortField] = query.sortOrder;
      queryOptions.sort = sort;
    }
    return await this.userRepository.find(null, queryOptions);
  }
}
