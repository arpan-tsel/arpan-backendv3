import { NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
require('dotenv').config();
import { Request, Response } from "express";

export const verifyTokenAccount = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization'];
    //if user doesnt send the token, then token will be null
    //else, split and get the token
    const token = authHeader && authHeader.split(' ')[1];     //get the token, split with space, because there is space between token
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
        if (err) return res.sendStatus(403);
        // req.body.email = (<any>decoded).email;
        next();
    })
}