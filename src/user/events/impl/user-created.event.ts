import { StorableEvent } from 'event-sourcing-nestjs';

export class UserCreatedEvent extends StorableEvent {
  eventAggregate = 'user';
  eventVersion = 1;

  constructor(
    // this id is an event id (not user's id)
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {
    super();
  }
}
