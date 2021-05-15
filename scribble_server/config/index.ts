import dotenv from 'dotenv';

// env file config
dotenv.config();

export const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_KEY: process.env.JWT_KEY
}
