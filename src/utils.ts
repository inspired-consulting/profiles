import fs from "fs";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const cacheFolderPath = path.join(__dirname, "..", "cache");
const cacheImagesFolderPath = path.join(cacheFolderPath, "images");

export function createCacheFolders() {
  if (!fs.existsSync(cacheFolderPath)) {
    fs.mkdirSync(cacheFolderPath);
    console.log("Creating cache folders...");
  }
  console.log("Successfully created cache folders.");

  if (!fs.existsSync(cacheImagesFolderPath)) {
    fs.mkdirSync(cacheImagesFolderPath);
  }
}

export function saveProfilePicture(userId: string, pictureBuffer: Buffer) {
  const filePath = path.join(cacheImagesFolderPath, `${userId}.jpeg`);
  fs.writeFileSync(filePath, pictureBuffer);
}
