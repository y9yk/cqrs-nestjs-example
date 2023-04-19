import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';
import { UserCreatedEvent } from 'src/user/events/impl/user-created.event';
import { generateUid } from 'src/common/utils';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    // Warning: we do not use store-event-bus
    // Through using StoreEventBut we can do below jobs.
    // 1) Store event history to datasource (persist)
    // 2) Delegate event to ViewUpdaters so, we can dispatch the event to use ViewUpdateHandler
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand): Promise<any> {
    // create event
    const eventId = generateUid();
    const { name, email, password } = command;
    const event = new UserCreatedEvent(name, email, password);
    // publish event
    this.eventBus.publish(event);
    // return created event id
    return eventId;
  }
}
