import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken";

/**
 * Handle user registration requests by processing them, storing a cookie, and saving the user information in the database
 * @param req The POST request from client: contains email, password, firstName, lastName
 * @param res response client with userInfo exclude the password
 * @param next next function to handle the error
 */
const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    // Check if user already exist by comparing the emails
    const existedUser = await User.findOne({ email });

    // Return error if user existed
    if (existedUser) {
      return res
        .status(500)
        .json({ message: "Email already exist, try login with this email." });
    }

    // Hashed the user entered password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create and saved new User to MongoDB database
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate token and store in cookie
    generateToken(res, newUser._id);

    const { password: userPassword, ...rest } = newUser._doc;

    res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};

/**
 * Handle user's login request by processing them, storing a cookie
 * @param req The POST request from client: containing email and password
 * @param res Response the client with userInfo excluding the password
 * @param next next function to handle the error
 */
const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "Invalid Email or Password" });

    const isPasswordMatched = await bcryptjs.compare(password, user.password);

    if (!isPasswordMatched)
      return res.status(401).json({ message: "Invalid Email or Password" });

    generateToken(res, user._id);

    const { password: userPassword, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

/**
 * If user is registered, generate token. Otherwise, for new user, generate a random password and
 * create new User and store in database, then generate token.
 * @param req The POST request from client side: containing email, displayName, photoURL
 * @param res Response the client with userinfo excluding the password
 * @param next Handle error
 */
const userOAuthLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { email, displayName, photoURL } = req.body;
  try {

    const nameArray = displayName.split(" ");
    const firstName = nameArray[0];
    const lastName = nameArray[nameArray.length - 1];

    // For some facebook user, they have unconfirmed email, in this case,
    // we create email for them
    if (!email) email = firstName+lastName+"@facebook.com";

    const user = await User.findOne({ email });
    
    // First, Check for registered user
    if (user) {
      generateToken(res, user._id);
      const { password, ...rest } = user._doc;
      res.status(200).json(rest);
    } else {
      // Generate a random 16 digits password for user
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      // Hash the password
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      // Create User object
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        avatar: photoURL,
      });

      await newUser.save(); //Insert new user into database

      generateToken(res, newUser._id); //Generate token and store in cookie

      const { password: userPassword, ...rest } = newUser._doc;

      res.status(201).json(rest);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Log out the user by remove the access_token cookie
 * @param req the POST request from client side
 * @param res response a simple message of logging out
 * @param next next function to handle the error
 */
const userLogout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.cookie("access_token", "", {
      expires: new Date(0),
    });
    res.status(200).json({ message: "User logout successfully" });
  } catch (error) {
    next(error);
  }
};

export { userRegister, userLogin, userLogout, userOAuthLogin };
