import express from "express";
import {createHotel} from '../controllers/hotels.controller';

const router = express.Router();

router.post('/createHotel', createHotel);

export default router;