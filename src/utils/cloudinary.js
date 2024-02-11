import {v2 as cloudinary} from "cloudinary"  // ya hama v2 lana ka kahta hai cloudinary se | as kerka ham v2 ka name change ker sakta hai
import fs from "fs"   // node js ka sath hi milta hai | file system manage kerna ka leya use hota hai jasa ka read write close open etc

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null 

        // upload the file on cloudinary
                          // .upload(path, {kon sa resorce upload kerna chata ho})
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        }); 

        console.log("file is uploaded on cloudinary ", response.url)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)  // remove the locally saved temporary file as the upload opration got failed
        return null
    }
}

export {uploadOnCloudinary}