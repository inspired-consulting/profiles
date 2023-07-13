import { User } from './user';

export class UserStorage {
  static users: User[] = [];

  static findOrCreate(profile: any, done: any) {
    let user = UserStorage.users.find(u => u.userId === profile.id);
    if (user) {
      done(null, user);
    } else {
      user = new User(profile.id, profile.displayName, profile.mail, profile.userPrincipalName);
      UserStorage.users.push(user);
      done(null, user);
    }
  }
}