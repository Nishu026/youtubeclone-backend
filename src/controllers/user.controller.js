import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import uploadOnCloudinary from '../utils/fileUpload.js'
import ApiResponse from '../utils/ApiRespose.js'


const registerUser = asyncHandler(async (req, res, next) => {
    //get user details from frontend
    //validation
    //check if user alredy exists:username,email
    //check for images
    //check for awtar
    //upload them to cloudinary,awtar
    //create user object-create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response


    //get user details from frontend
    const { fullName, username, email, password } = req.body
    console.log("Full Name:", fullName, "Username:", username, "Email:", email, "Password:", password)


    //validation
    if (
        [fullName, username, email, password].some((field) =>
            field.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User already exists")
    }

    const avatarLocalPath=req.files ?.avatar[0]?.path;
    const coverImageLocalPath = req.files ?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar image is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(400, "Avatar image upload failed")
    }

   const user =await User.create({
        fullName, 
        username:username.toLowerCase(), 
        email, 
        password, 
        avatar:avatar.url, 
        coverImage:coverImage ?.url || null,
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "User creation failed")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User Registered successfully"))
})

export default registerUser