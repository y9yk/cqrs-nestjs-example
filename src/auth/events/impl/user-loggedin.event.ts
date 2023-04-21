export class UserLoggedInEvent {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly dispatchedTime: string,
  ) {}
}
