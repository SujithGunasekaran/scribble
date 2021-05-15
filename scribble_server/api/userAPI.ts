import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import user from '../models/userModel';
import jwt from 'jsonwebtoken';
import { config } from '../config';

const router = Router();

const { JWT_KEY } = config;

router.post('/signup', async (req: Request, res: Response) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(404).json({
            status: "Error",
            message: "Please enter all fields"
        })
    }

    try {

        const userInfo = await user.findOne({ email });

        if (userInfo) throw new Error('User already Exist');

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            email,
            password: encryptedPassword
        }

        const savedUser = await user.create(newUser);
        if (!savedUser) throw new Error('User not saved. Something went wrong');

        res.status(200).json({
            status: "Success",
            user: {
                id: savedUser.id,
                email: savedUser.email
            }
        })

    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
})

router.post('/login', async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        const userInfo = await user.findOne({ email });
        if (!userInfo) throw new Error('Please enter valid email');

        const isPasswordMatched = await bcrypt.compare(password, userInfo.password);
        if (!isPasswordMatched) throw new Error('Please enter valid password');

        const token = jwt.sign({ id: userInfo._id }, `${JWT_KEY}`, { expiresIn: '7d' });
        if (!token) throw new Error("Authentication failed ! Something went wrong");

        res.status(200).json({
            status: "Success",
            token,
            userInfo: {
                id: userInfo.id,
                email: userInfo.email
            }
        })
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }

})


export default router;

