import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';
import { UserCreatedEvent } from 'src/user/events/impl/user-created.event';
import { UserRepository } from 'src/user/repositories/user.repository';
import { ConflictException } from 'src/common/exceptions/http.exceptions';
import { getCurrentTime, getHashedPassword } from 'src/common/utils';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    // Warning: we do not use store-event-bus
    // But through using StoreEventBut we can do below jobs.
    // 1) Store event history to datasource (persist)
    // 2) Delegate event to ViewUpdaters so, we can dispatch the event to use ViewUpdateHandler
    // This is future work.
    private readonly eventBus: EventBus,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<any> {
    // command
    const { name, email, password } = command;
    // inspect if user is already created or not
    const isAlreadyCreatedUser = await this.userRepository.findOne({
      email,
    });
    // process
    if (isAlreadyCreatedUser) {
      throw new ConflictException();
    } else {
      // get hashed-password
      const hashedPassword = await getHashedPassword(password);
      // create user
      const ret = await this.userRepository.create({
        name,
        email,
        password: hashedPassword,
      });
      // create event and publish
      const event = new UserCreatedEvent(name, email, getCurrentTime());
      this.eventBus.publish(event);
      // return
      return ret;
    }
  }
}
