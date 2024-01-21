import express from "express";
import {verifyToken} from "../utils/verifyToken";
import {createHotel} from '../controllers/hotels.controller';

const router = express.Router();

router.post('/createHotel', verifyToken, createHotel);

export default router;