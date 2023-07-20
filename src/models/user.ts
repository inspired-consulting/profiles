declare global {
  namespace Express {
    interface User {
      userId: string;
      displayName: string;
      mail: string;
      accessToken: string;
      givenName: string;
      surname: string;
      is_admin: boolean;
      provider: string;
      picture: string;
    }
  }
}

export class User {
  userId: string;
  displayName: string;
  mail: string;
  accessToken: string = "";
  givenName: string = "";
  surname: string = "";
  is_admin: boolean = false;
  provider: string = "";
  picture: string = "";
  constructor(userId: string, displayName: string, mail: string) {
    this.userId = userId;
    this.displayName = displayName;
    this.mail = mail;
  }

  public withName(givenName: string, surname: string): User {
    this.givenName = givenName;
    this.surname = surname;
    return this;
  }

  public withAdminStatus(isAdmin: boolean): User {
    this.is_admin = isAdmin;
    return this;
  }

  public withProvider(provider: string): User {
    this.provider = provider;
    return this;
  }

  public withPicture(picture: string): User {
    this.picture = picture;
    return this;
  }
}
