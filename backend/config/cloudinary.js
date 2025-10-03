/*import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
*/
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dg4yrcadp',
  api_key: process.env.CLOUDINARY_API_KEY || '223165953936529',
  api_secret: process.env.CLOUDINARY_API_SECRET || '-F8YgGf_ZP1tAhqRN6KLFO4p3TU',
});

export default cloudinary;

