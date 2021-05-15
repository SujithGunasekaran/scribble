import mongoose from 'mongoose';
import { sampleData } from './';
import { config } from '../config';
import userModel from '../models/userModel';
import notesModel from '../models/notesModel';

const { user, notes } = sampleData;
const { MONGO_URI } = config;

mongoose.connect(`${MONGO_URI}`, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Mongodb Connected and populating data...");
        await userModel.deleteMany({});
        await notesModel.deleteMany({});
        await userModel.create(user);
        await notesModel.create(notes);
        console.log("Populated data into you db completed successfully...")
    })
    .catch((err) => {
        console.log(`Error while connecting mongodb ${err}`);
    })

