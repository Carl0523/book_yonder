import mongoose from "mongoose";

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  pricePerNight: number;
  address: string;
  country: string;
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
    name: {
      type: String,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    adultCount: {
      type: Number,
      required: true,
    },
    childCount: {
      type: Number,
      required: true,
    },
    amenities: {
      type: [String],
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    imageUrls: {
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
