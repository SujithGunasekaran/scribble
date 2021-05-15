import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from './config';

// API routes
import notesRoute from './api/notesAPI';
import userRoute from './api/userAPI';

const { PORT, MONGO_URI } = config;

// express server
const server = express();

server.use(cors()); // cors middleware
server.use(bodyParser.json()); // parser middleware


// mongo db connection
mongoose.connect(`${MONGO_URI}`, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongodb connected Successfully");
    })
    .catch((err) => {
        console.log(`Error while connecting mongodb ${err}`);
    })

server.use('/api/user', userRoute);
server.use('/api/notes', notesRoute);

// server initialzing 
server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
})
