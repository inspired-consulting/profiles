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

    console.log("Microsoft Profile Data:", profile);

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

async function getProfilePicture(accessToken: string): Promise<string> {
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

    const blob = await response.blob();

    if (blob.size === 0) {
      // If the picture is not available, return an empty string
      return "";
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = function () {
        const dataURL = reader.result as string;
        resolve(dataURL);
      };

      reader.onerror = function () {
        reject(new Error("Error reading the profile picture"));
      };

      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    return ""; // Return an empty string or a default profile picture URL in case of an error
  }
}
