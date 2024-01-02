import { Response } from "express";
import jwt from "jsonwebtoken";

const generateToken = (res : Response, id : string) => {
    const token = jwt.sign({id}, process.env.JWT_KEY as string,{
        expiresIn: "30d"
    })

    res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })

}

export default generateToken;