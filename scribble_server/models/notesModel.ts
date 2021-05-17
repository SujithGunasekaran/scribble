import { Schema, model } from 'mongoose';


const notesSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'scribbleUserList'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const notes = model('scribbleNotes', notesSchema);
export default notes;
