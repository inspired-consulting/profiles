declare global {
  namespace Express {
    interface User {
      userId: string;
      displayName: string;
      mail: string;
      givenName: string;
      surname: string;
      is_admin: boolean;
      picture: string;
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
  picture: string;

  constructor(
    userId: string,
    displayName: string,
    mail: string,
    givenName: string,
    surname: string,
    is_admin: boolean,
    picture: string
  ) {
    this.userId = userId;
    this.displayName = displayName;
    this.mail = mail;
    this.givenName = givenName;
    this.surname = surname;
    this.is_admin = is_admin;
    this.picture = picture;
  }
}
