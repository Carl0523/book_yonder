import mongoose from "mongoose";

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  pricePerNight: number;
  address: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
  type: string;
  description: string;
  adultCount: number;
  childCount: number;
  amenities: string[];
  rating: number;
  imageUrls: string[];
};

const hotelSchema = new mongoose.Schema<HotelType>(
  {
    userId: {
      type: String,
      required: true,
    },
    name: { //Name and location
      type: String,
      required: true,
    },
    pricePerNight: { //Property set up
      type: Number,
      required: true,
    },
    address: { //Name and location
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: { //Name and location
      type: String,
      required: true,
    },
    type: { //Name and location
      type: String,
      required: true,
    },
    description: { //Property set up
      type: String,
      required: true,
    },
    adultCount: { //Property set up
      type: Number,
      required: true,
    },
    childCount: { //Property set up
      type: Number,
      required: true,
    },
    amenities: { //Property set up
      type: [String],
      required: true,
    },
    rating: { //Property set up
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    imageUrls: { //Property photo
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
