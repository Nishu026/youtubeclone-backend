import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (filepath) => {
    try {
        if(!filepath) return null
        const response = await cloudinary.uploader.upload(filepath, {
            resource_type: 'auto'
        })
        console.log('file uploaded to cloudinary',response.url);
        return response
        
    } catch (error) {
        fs.unlinkSync(filepath)  // remove the locally saved temp file as the upload operation got failed
        return null;
    }
}

export default uploadOnCloudinary