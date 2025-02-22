import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    secure: true,
  });

export const profilePicUpload = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            resource_type: 'image', 
            folder: 'profile_pictures',
        });
        return result;
    } catch (error) {
        console.log("error while uploading profile image to cloudinary", error);
    }
}

export const myphotosUpload = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            resource_type: 'image', 
            folder: 'myphotos',
        });
        return result;
    } catch (error) {
        console.log("error while uploading images to cloudinary", error);
    }
}