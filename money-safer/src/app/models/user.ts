export class User {
  constructor(
    public username: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public adress: string,
    public tokeExpiritationDate: Date,
    private  token: string,
  ) {}

  get getToken() {
    // if (!this.tokeExpiritationDate) {
    //   return null;
    // }
    return this.token;
  }
}
