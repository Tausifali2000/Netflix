import jwt from "jsonwebtoken";  //Web token creator package
import { ENV_VARS } from "../config/envVars.js"; //ENV Variables 

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d"});

  res.cookie("jwt-netflix", token, {
    maxAge: 15*24*60*60*1000, //15 days in milli-seconds
    httpOnly: true, //prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", //CSRF attacks cross-site request forgery attacks
    secure: ENV_VARS.NODE_ENV !== "development"
  });

  return token;
}
