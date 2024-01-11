import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

/**
 * Update user's email, first name, last name
 * @param req Request send from client side: including first name, last name, and email
 * @param res Response to client side with updated info
 * @param next handle error
 */
const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Verify the user id: compare the token's id with request param id from client
  if (req.userId != req.params.id)
    return res.status(401).json({ message: "Unauthorized" });

  // Check if new email already linked with other user
  if (req.body.newEmail) {
    const existEmail = await User.findOne({ email: req.body.newEmail });
    if (existEmail)
      return res.status(500).json({ message: "The email already exist" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          firstName: req.body.newFirstName,
          lastName: req.body.newLastName,
          email: req.body.newEmail,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser!._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

/**
 * Hash the password and then update it in database
 * @param req The request from client: including password
 * @param res The response containing the updated info
 * @param next the next function to handle the error
 */
const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {newPassword, oldPassword} = req.body;

  // 1. Return not authorized error if not matched with token id
  if (req.params.id !== req.userId)
    return res.status(401).json({ message: "Unauthorized" });

  // 2. Check if entered old password is correct
  const user = await User.findById(req.params.id);
  if (!bcrypt.compareSync(oldPassword, user!.password))
    return res
      .status(400)
      .json({ message: "You have entered incorrect old password" });

  // 3. Hash the password and updated it in database
  try {
    const hashedPassword = bcrypt.hashSync(newPassword);

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          password: hashedPassword,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser!._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export { updateProfile, updatePassword };
