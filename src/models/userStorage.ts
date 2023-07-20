import { User } from "./user.js";

export class UserStorage {
  static users: User[] = [];

  static findOrCreateMicrosoft(
    accessToken: any,
    refreshToken: any,
    profile: any,
    done: any
  ) {
    let user = UserStorage.users.find((u) => u.userId === profile.id);
    const { id, displayName, mail, givenName, surname } = profile._json;

    // console.log("Microsoft Profile Data:", profile);

    if (user) {
      done(null, user);
    } else {
      user = new User(id, displayName, mail)
        .withName(givenName, surname)
        .withAdminStatus(false)
        .withProvider("Microsoft");
      UserStorage.users.push(user);
      done(null, user);
    }
  }
}
