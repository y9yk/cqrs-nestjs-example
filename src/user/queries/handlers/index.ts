import { GetUserByEmailPasswordHandler } from './get-user-by-email-password.handler';
import { GetUserByEmailHandler } from './get-user-by-email.handler';
import { GetUsersHandler } from './get-users.handler';

export const QueryHandlers = [
  GetUserByEmailHandler,
  GetUserByEmailPasswordHandler,
  GetUsersHandler,
];
