import mongoose from 'mongoose';

const userOne = mongoose.Types.ObjectId();
const userTwo = mongoose.Types.ObjectId();

interface sampleData {
    user: {
        _id: any,
        email: string,
        password: string
    }[],
    notes: {
        userID: any,
        title: string,
        content: string
    }[]
}


export const sampleData: sampleData = {
    user: [
        {
            _id: userOne,
            email: "sujith@gmail.com",
            password: "password123"
        },
        {
            _id: userTwo,
            email: "hello@gmail.com",
            password: "password123"
        }
    ],
    notes: [
        {
            userID: userOne,
            title: "Fullstack application using typescript",
            content: "step 1 : installation"
        },
        {
            userID: userOne,
            title: "express and node.js application setup",
            content: "step 1 : installation"
        }
    ]
}
