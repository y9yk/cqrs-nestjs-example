export class GetUserByEmailPasswordQuery {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
