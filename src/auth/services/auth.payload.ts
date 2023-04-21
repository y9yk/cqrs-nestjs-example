export class AuthPayload {
  constructor(public readonly name: string, public readonly email: string) {}

  public toJson(): any {
    return {
      name: this.name,
      email: this.email,
    };
  }
}
