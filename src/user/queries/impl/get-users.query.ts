export class GetUsersQuery {
  constructor(
    public readonly page: number = 1,
    public readonly size: number = 10,
    public readonly sortField?: string,
    public readonly sortOrder?: string,
  ) {}
}
