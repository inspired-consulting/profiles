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
  givenName: string;
  surname: string;
  is_admin: boolean;

  constructor(
    userId: string,
    displayName: string,
    mail: string,
    givenName: string,
    surname: string,
    is_admin: boolean
  ) {
    this.userId = userId;
    this.displayName = displayName;
    this.mail = mail;
    this.givenName = givenName;
    this.surname = surname;
    this.is_admin = is_admin;
  }
}
