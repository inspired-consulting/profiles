import fs from "fs";
import path from "path";
import sharp from "sharp";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const cacheFolderPath = path.join(__dirname, "..", "cache");
const cacheImagesFolderPath = path.join(cacheFolderPath, "images");
const cacheThumbnailsFolderPath = path.join(cacheFolderPath, "thumbnails");

export function createCacheFolders() {
  if (!fs.existsSync(cacheFolderPath)) {
    fs.mkdirSync(cacheFolderPath);
  }

  if (!fs.existsSync(cacheImagesFolderPath)) {
    fs.mkdirSync(cacheImagesFolderPath);
  }

  if (!fs.existsSync(cacheThumbnailsFolderPath)) {
    fs.mkdirSync(cacheThumbnailsFolderPath);
  }
}

export async function saveProfilePicture(
  userId: string,
  pictureBuffer: Buffer
) {
  const originalFilePath = path.join(cacheImagesFolderPath, `${userId}.jpeg`);
  const thumbnailFilePath = path.join(
    cacheThumbnailsFolderPath,
    `${userId}_thumbnail.jpeg`
  );
  try {
    await sharp(pictureBuffer).resize(100, 100).toFile(thumbnailFilePath);

    console.log("Successfully saved profile picture and thumbnail.");

    fs.writeFileSync(originalFilePath, pictureBuffer);
  } catch (error) {
    console.error("Error saving profile picture:", error);
    fs.writeFileSync(originalFilePath, pictureBuffer);
  }
}

export function serveCachedImage(imageType: string, userId: string, res: any) {
  const cacheFolderPath =
    imageType === "images" ? cacheImagesFolderPath : cacheThumbnailsFolderPath;

  const fileName =
    imageType === "images"
      ? `${userId}.jpeg`
      : imageType === "thumbnails"
      ? `${userId}.jpeg`
      : null;

  if (!fileName) {
    // Invalid imageType, send a 404 response
    return res.sendStatus(404);
  }

  const filePath = path.join(cacheFolderPath, fileName);

  if (fs.existsSync(filePath)) {
    const maxAgeInSeconds = 1800;
    res.setHeader("Cache-Control", `public, max-age=${maxAgeInSeconds}`);

    res.sendFile(filePath);
  } else {
    res.sendStatus(404);
  }
}
