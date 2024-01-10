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
    
    const {password, ...rest} = updatedUser!._doc;

    res.status(200).json(rest);

  } catch (error) {
    next(error);
  }
};

export { updateProfile };
