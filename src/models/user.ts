//For in-memory storage:
let users: User[] = [];

class User {
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

  static findOrCreate(profile: any, done: any) {
    let user = users.find(u => u.userId === profile.id);
    if (user) {
      done(null, user);
    } else {
      user = new User(profile.id, profile.displayName, profile.mail, profile.userPrincipalName);
      users.push(user);
      done(null, user);
    }
  }
}

export default User;
