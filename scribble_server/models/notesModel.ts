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
    }
})

const notes = model('scribbleNotes', notesSchema);
export default notes;
