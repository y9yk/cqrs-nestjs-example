import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { UserLoggedInEvent } from '../impl/user-loggedin.event';

@EventsHandler(UserLoggedInEvent)
export class UserLoggedInHandler implements IEventHandler<UserLoggedInEvent> {
  handle(event: UserLoggedInEvent) {
    // inspect event or notification
    console.log(`User Logged-in: ${event}`);
  }
}
