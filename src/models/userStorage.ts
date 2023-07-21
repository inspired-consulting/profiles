import { User } from "./user.js";
import fetch from "node-fetch";
import { saveProfilePicture } from "../utils.js";
import fs from "fs";
import path from "path";

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

    if (user) {
      done(null, user);
    } else {
      const picture = await getProfilePicture(id, accessToken);
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

export async function getProfilePicture(
  userId: string,
  accessToken: string
): Promise<string> {
  // console.log(`The access token: ${accessToken}`);

  if (accessToken) {
    try {
      const url = "https://graph.microsoft.com/v1.0/me/photo/$value";
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch profile picture: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();

      if (arrayBuffer.byteLength === 0) {
        return "";
      }

      saveProfilePicture(userId, Buffer.from(arrayBuffer));

      const buffer = Buffer.from(arrayBuffer);

      const dataURL = `data:image/jpeg;base64,${buffer.toString("base64")}`;

      return dataURL;
    } catch (error) {
      console.error("Error fetching profile picture:", error);
      return "../../public/images/inspired_consulting.svg";
    }
  } else {
    return "../../public/images/inspired_consulting.svg";
  }
}
