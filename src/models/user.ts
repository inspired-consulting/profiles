declare global {
  namespace Express {
    interface User {
      userId: string;
      displayName: string;
      mail: string;
      givenName: string;
      surname: string;
    }
  }
}

export class User {
  userId: string;
  displayName: string;
  mail: string;
  givenName: string;
  surname: string;

  constructor(
    userId: string,
    displayName: string,
    mail: string,
    givenName: string,
    surname: string
  ) {
    this.userId = userId;
    this.displayName = displayName;
    this.mail = mail;
    this.givenName = givenName;
    this.surname = surname;
  }
}
