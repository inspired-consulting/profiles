declare global {
  namespace Express {
    interface User {
      userId: string;
      displayName: string;
      mail: string;
      givenName: string;
      surname: string;
      is_admin: boolean;
    }
  }
}

export class User {
  userId: string;
  displayName: string;
  mail: string;
  givenName: string = "";
  surname: string = "";
  is_admin: boolean = false;
  provider: string = "";
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
}
