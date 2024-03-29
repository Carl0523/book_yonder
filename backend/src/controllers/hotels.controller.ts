import { Request, Response, NextFunction } from "express";
import Hotel, { HotelType } from "../models/hotel.model";

/**
 * Create a new hotel item and send to Database Hotel collection
 * @param req POST request from client, containing all info required to create
 *            hotel object
 * @param res response with hotel's info
 * @param next handle error
 */
const createHotel = async (req: Request, res: Response, next: NextFunction) => {
  const hotelData: HotelType = req.body;
  if (hotelData.userId !== req.userId)
    return res.status(401).json({ message: "Unauthorized" });
  try {
    const hotel = await Hotel.create(hotelData);
    res.status(201).json(hotel);
  } catch (error) {
    next(error);
  }
};

export { createHotel };
