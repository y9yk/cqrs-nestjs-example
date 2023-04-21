export class UserCreatedEvent {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly dispatchedTime: string,
  ) {}

  public toString(): string {
    const plainObject = {
      name: this.name,
      email: this.email,
      dispatchedTime: this.dispatchedTime,
    };
    // stringify and return
    return JSON.stringify(plainObject);
  }
}
