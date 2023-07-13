declare global {
  namespace Express {
    interface User {
      userId: string;
    }
  }
}

export class User {
  userId: string;
  displayName: string;
  mail: string;
  userPrincipalName: string;

  constructor(userId: string, displayName: string, mail: string, userPrincipalName: string) {
    this.userId = userId;
    this.displayName = displayName;
    this.mail = mail;
    this.userPrincipalName = userPrincipalName;
  }

}

