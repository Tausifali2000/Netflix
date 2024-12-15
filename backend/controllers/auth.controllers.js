import { User } from '../models/user.model.js';
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from '../utlis/generateToken.js';


//Sign up function
export async function signup(req, res) {
  try {
    const {email, password, username} = req.body;  //Fetching fields data from frontend

    //If Checks
    if(!email || !password || !username) {   //Empty fields check
      return res.status(400).json({success: false, message:"All fields are required"});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  //Invalid email type check

    if(!emailRegex.test(email)) {   
      return res.status(400).json({sucess: false, messgae:"Invalid email"})
    }

    if(password.length < 6) {     //Password length check
      return res.status(400).json({sucess: false, message:"Password must be atleast 6 characters"});
    }

    const existingUserByEmail = await User.findOne({email:email}) //finding if email already exits

    if(existingUserByEmail) {  
      return res.status(400).json({Sucess: false, message:"Email already exists"})    
    }

    const existingUserByUsername = await User.findOne({username:username}) //finding if Username already exits

    if(existingUserByUsername) {  
      return res.status(400).json({Sucess: false, message:"Username already exists"})    
    }

    //Hashing the password 
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3"]; //loading the default profile pictures
    const image = PROFILE_PICS[Math.floor(Math.random()* PROFILE_PICS.length)]; //Setting random default profile picture

   //Creating new user
    const newUser = new User( {  
      email: email,
      password: hashedPassword,
      username: username,
      image: image,
    })

    
      generateTokenAndSetCookie(newUser._id, res); //token generation
      
      await newUser.save() //Saving new user
      
      res.status(201).json({Sucess: true, user: {...newUser._doc, password:""}}) //Creation response for backend
    

    

   

  } catch (error) {   
    console.log("Error in signup controller", error.message);
    res.status(500).json({success: false, message:"Internal server error"})
  }
}

//Login function
export async function login(req, res) {
 try {
  const {email, password} = req.body //Fetching email and password from front end 

  if(!email || !password) {   //Empty fields check
    return res.status(400).json({sucess: false, message: "All fields are required"});
  }

  const user = await User.findOne({email: email}); //finding the email in database
  
  if(!user) {
    return res.status(404).json({success: false, message: "Invalid credentials"});
  }

  const isPasswordCorrect = await bcryptjs.compare(password, user.password); //checking if password correct using bcryptjs.compare()

  if(!isPasswordCorrect) {
    return res.status(400).json({success: false, message:"Invalid credentials"});
  }

  generateTokenAndSetCookie(user._id, res); //genrating cookie

  res.status(200).json({  //success response for backend
    success:true,
    user: {
      ...user._doc,
      password: ""
    }
  })


 } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({success: false, message: "Internal server error"})
 }
}

//Logout function
export async function logout(req, res) {
 try {
  res.clearCookie("jwt-netflix"); //Removing the cookie
  res.status(200).json({sucess: true, message: "Logged out successfully"});
 } catch (error) {
  console.log("Error in logout controller", error.message);
  res.status(500).json({sucess: false, message: "Internal server error"});
 }
}