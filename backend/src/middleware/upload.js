
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.example" });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ,
});

// Storage for images
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "courses/images",
    resource_type: "image",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});
console.log(cloudinary.config());
// Storage for videos
const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "courses/videos",
    resource_type: "video",
    allowed_formats: ["mp4", "mov", "avi", "mkv"],
  },
});

export const uploadImage = multer({ storage: imageStorage });
export const uploadVideo = multer({ storage: videoStorage });
