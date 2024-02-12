import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponce } from "../utils/ApiResponce.js";


const registerUser = asyncHandler(async (req, res) => {

        // algorethem 
// get user details from frontend
// validation - not empty
// check if user already exists: username, email
// check for images, check for avatar
// upload them to cloudinary, avatar
// create user object - create entry in db
// remove password and refresh token field from response
// check for user creation
// return res



    const {username, email, fullName, password} = req.body;
    console.log("email", email)


    // Validation - not empty
    // if(fullName === ""){      // asa ek ek filed ko chak ker dakta hai
    //     throw new ApiError(400, "Full name is required")
    // }
    if([username, email, fullName, password].some((field)=>{   // sari fields ko ek sath check ker raha hai 
        field?.trim() === ""
    })){
        throw new ApiError(400, "All fields are required")
    }
});

// Validation - User Existed 
const existedUser = User.findOne({
    $or: [{username}, {email}]
})

if(existedUser){
    throw new ApiError(409, "User with email or username is already exists")
}

// check for imgs 
const avatarLocalPath = req.files?.avatar[0]?.path;    // multer hama req ka ander files data hai | avatar file ka name hai | [0] is ki first propertie | jis ka ham path la raha hai | ? mark is leya use ker raha hai ka kahi file aya ya na aya
const coverImageLocalPath = req.files?.coverImage[0]?.path;

if(!avatarLocalPath){
    throw ApiError(400, "Avatar file is required")
}


// upload them to cloudinary 
const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)

if(!avatar){
    throw ApiError(400, "Avatar file is required")
}


const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",   // cover img hai tu os ka url store kerlo ni tu empty rahna do
    email,
    password,
    username: username.toLowerCase()
})

// remove password and refresh token filed from response 
const createdUser = await User.findById(user._id).select(   // defalt sab select hota hai 
    "-password -refreshToken"   // - means hama password aur refreshToken ni chaheya 
)

if(!createdUser){
    throw ApiError(500, "Somthing went wrong while registering the user")
}

// return responce 
return res.status(201).json(
    new ApiResponce(200, createdUser, "User registerd successfully")
)

export { registerUser }
