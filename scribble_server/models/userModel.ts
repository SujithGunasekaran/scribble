import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        index: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
});

const user = model('scribbleUserList', userSchema);
export default user;
