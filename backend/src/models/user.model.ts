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
    default: "https://img.freepik.com/free-vector/young-woman-white_25030-39548.jpg?w=900&t=st=1704433648~exp=1704434248~hmac=63699a6214db694771759ae9e3c28163bd3e7fc37b088ad9b750dee07a2b7fb1",
  }
}, {timestamps: true});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
