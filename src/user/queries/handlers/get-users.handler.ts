import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '../impl';
import { UserService } from 'src/user/services/user.service';
import { success } from 'src/common/status.dispatcher';
import { GetUsersResponseDto } from 'src/user/dto/user.response.dto';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly userService: UserService) {}

  async execute(query: GetUsersQuery): Promise<GetUsersResponseDto> {
    // get params from query
    const { name, email, page, size, sortField, sortOrder } = query;
    // get users
    const users = await this.userService.getUsers({
      name,
      email,
      page,
      size,
      sortField,
      sortOrder,
    });
    // return
    return success(users);
  }
}
