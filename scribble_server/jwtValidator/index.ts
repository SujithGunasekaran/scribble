import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

const { JWT_KEY } = config;

export const authValidation = async (req: Request, res: Response) => {
    const { usertoken } = req.headers;
    try {
        if (!usertoken) throw new Error("Access denied!");
        const token = jwt.verify(`${usertoken}`, `${JWT_KEY}`);
        return token;
    }
    catch (err) {
        throw new Error(err.message);
    }
}
