import {Request, Response, NextFunction} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Add userId prop to the Request interface
declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

export const verifyToken = (req : Request, res: Response, next: NextFunction) => {

    // 1. Extract the named "access_token" cookie in the coming request"
    // NOTE: it should be a string to do cookie-parser middleware function
    const token : string = req.cookies.access_token;

    // 2. Response not authorized error if token not found
    if (!token) return res.status(404).json({message: "User is not authorized"})

    // 3. verify the token with JWT SECRET KEY we have created earlier
    // Extract the payload id and assign it to req.userId prop
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY as string);
        req.userId = (decoded as JwtPayload).id;
        next();

    } catch (error) {
        return res.status(401).json({message: "User is not authorized"})
    }
}
