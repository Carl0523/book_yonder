import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken";

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
      return res.status(500).json({ message: "User is already existed" });
    }

    // Hashed the user entered password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create and saved new User to MongoDB database
    const newUser = new User({firstName, lastName, email, password: hashedPassword});
    await newUser.save();

    // Generate token and store in cookie
    generateToken(res, newUser._id);

    const {password: userPassword, ...rest} = newUser._doc;


    
    res.status(201).json(rest);


  } catch (error) {
    next(error);
  }
};

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body;

  try {
    const user = await User.findOne({email});

    if (!user) return res.status(404).json({message: "Invalid Email or Password"});

    const isPasswordMatched = await bcryptjs.compare(password, user.password);

    if (!isPasswordMatched) return res.status(401).json({message: "Invalid Email or Password"});

    generateToken(res, user._id);

    const {password: userPassword, ...rest} = user._doc;

    res.status(201).json(rest);

  } catch (error) {
    next(error);
  }
}

export { userRegister, userLogin };
