import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from './config';
import path from 'path';

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

if (process.env.NODE_ENV === 'production') {
    server.use(express.static('scribble_client/build'))
    server.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + 'scribble_client/build/index.html'))
    })
}

// server.use(express.static('scribble_client/build'))
// server.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + 'scribble_client/build/index.html'))
// })

// server initialzing 
server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
})
