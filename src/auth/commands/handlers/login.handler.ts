import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from '../impl/login.command';
import { AuthService } from 'src/auth/services/auth.service';
import { UserLoggedInEvent } from 'src/auth/events/impl/user-loggedin.event';
import { getCurrentTime } from 'src/common/utils';
import { LoggedInResultDto } from 'src/auth/dto/login.dto';
import { success } from 'src/common/status.dispatcher';
import { LoginResponseDto } from 'src/auth/dto/login.response.dto';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly authService: AuthService,
  ) {}

  async execute(command: LoginCommand): Promise<LoginResponseDto> {
    // get command
    const { email, password } = command;
    // login process
    const ret: LoggedInResultDto = await this.authService.login({
      email,
      password,
    });
    // create event and publish
    const { name } = ret;
    const event = new UserLoggedInEvent(name, email, getCurrentTime());
    this.eventBus.publish(event);
    // return
    return success(ret);
  }
}
