import mongoose from "mongoose";


export type UserType = {
  _id: string;
  _doc: any;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string;
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png",
  }
}, {timestamps: true});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
