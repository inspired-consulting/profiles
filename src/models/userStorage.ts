import { User } from "./user.js";
import fetch from "node-fetch";

export class UserStorage {
  static users: User[] = [];

  static async findOrCreateMicrosoft(
    accessToken: any,
    refreshToken: any,
    profile: any,
    done: any
  ) {
    let user = UserStorage.users.find((u) => u.userId === profile.id);
    const { id, displayName, mail, givenName, surname } = profile._json;

    console.log("Microsoft Profile Data:", profile);
    console.log("AccessToken, in findOrCreateMicrosoft:", accessToken);

    if (user) {
      done(null, user);
    } else {
      const picture = await getProfilePicture(accessToken);
      user = new User(id, displayName, mail)
        .withName(givenName, surname)
        .withAdminStatus(false)
        .withProvider("Microsoft")
        .withPicture(picture);
      UserStorage.users.push(user);
      done(null, user);
    }
  }
}

export async function getProfilePicture(accessToken: string): Promise<string> {
  console.log(`The access token: ${accessToken}`);
  try {
    const url = "https://graph.microsoft.com/v1.0/me/photo/$value";
    console.log(`The access token, in getProfilePicture: ${accessToken}`);
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile picture: ${response.status}`);
    }

    const buffer = await response.buffer();

    if (buffer.byteLength === 0) {
      return "";
    }
    const dataURL = `data:image/jpeg;base64,${buffer.toString("base64")}`;

    return dataURL;
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    return "
  }
}
