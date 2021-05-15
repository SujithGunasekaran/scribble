import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

interface user {
    _id: any
    email: string,
    password: string
}

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

userSchema.pre<user>('save', async function (next) {
    const user = this;
    const { password } = user;
    try {
        const salt = await bcrypt.genSalt(10);
        if (!salt) throw new Error("Somthing went wrong while getting salt");
        const encryptedPassword = await bcrypt.hash(password, salt);
        if (!encryptedPassword) throw new Error("Something went wrong while encypting password..");
        user.password = encryptedPassword;
        next();
    }
    catch (err) {
        next(err);
    }
})

const user = model('scribbleUserList', userSchema);
export default user;
