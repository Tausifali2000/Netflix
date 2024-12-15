import jwt from "jsonwebtoken";  //Web token creator package
import { ENV_VARS } from "../config/envVars.js"; //ENV Variables 

export const generateTokenAndSetCookie = {userId, res}
