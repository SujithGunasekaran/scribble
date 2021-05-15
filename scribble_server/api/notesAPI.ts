import { Router, Request, Response, NextFunction } from 'express';
import notes from '../models/notesModel';
import userModel from '../models/userModel';
import { authValidation } from '../jwtValidator';

const router = Router();

const checkUser = async (userID: string) => {
    try {
        const user = await userModel.findOne({ _id: userID });
        if (!user) return false;
        if (user) return true;
    }
    catch (err) {
        return false
    }
}

const authCheck = async (req: Request, res: Response) => {
    try {
        const user = await authValidation(req, res);
        if (!user) throw new Error("Access denied!");
    }
    catch (err) {
        res.status(404).json({
            status: "Failed",
            message: "Access denied"
        })
    }
}

// get all notes by user api

router.get('/getnotes/:userID', async (req: Request, res: Response) => {

    await authCheck(req, res);

    const { userID } = req.params;
    try {
        const user = await userModel.findOne({ _id: userID });
        if (!user) throw new Error("User doesnot exist");
        const noteList = await notes.find({ userID })
        if (!noteList) throw new Error("Something went wrong while getting noteList");
        res.status(200).json({
            status: "Success",
            notes: noteList
        })
    }
    catch (err) {
        res.status(404).json({
            status: "Failed",
            message: err.message
        })
    }
})


// create note api

router.post('/createNote', async (req: Request, res: Response) => {

    await authCheck(req, res);

    const { userID, title, content } = req.body;
    try {
        const user = await userModel.findOne({ _id: userID });
        if (!user) throw new Error("Invalid user!");
        const newNotes = {
            userID,
            title,
            content
        };
        const savedNotes = await notes.create(newNotes);
        if (!savedNotes) throw new Error("Somthing went wrong while saving notes..");
        res.status(200).json({
            status: "Success",
            notes: {
                id: savedNotes._id,
                title: savedNotes.title,
                content: savedNotes.content,
                userID: savedNotes.userID
            }
        });
    }
    catch (err) {
        res.status(404).json({
            status: "Failed",
            message: err.message
        });
    }
})


// delete note api

router.post('/deleteNote/:id', async (req: Request, res: Response) => {

    await authCheck(req, res);

    const { id } = req.params;
    try {
        const isNoteExist = await notes.findOne({ _id: id });
        if (!isNoteExist) throw new Error('Notes does not Exist');
        const deletedNote = await notes.findOneAndDelete({ _id: id });
        if (!deletedNote) throw new Error("Something went wrong while deleting note");
        res.status(200).json({
            status: "Success",
            message: "Note deleted successfully"
        });
    }
    catch (err) {
        res.status(404).json({
            status: "Failed",
            message: err.message
        });
    }
})


// update note api

router.post('/upateNote/:id', async (req: Request, res: Response) => {
    const { title, content } = req.body;
    const { id } = req.params;
    try {
        const isNoteExist = await notes.findOne({ _id: id });
        if (!isNoteExist) throw new Error("Notes doesnot exist");
        const updatedNotes = await notes.findOneAndUpdate({ _id: id }, { $set: { title, content } }, { new: true, runValidators: true });
        if (!updatedNotes) throw new Error("Somthing went wrong while updating notes..");
        res.status(200).json({
            status: "Success",
            notes: {
                id: updatedNotes._id,
                title: updatedNotes.title,
                content: updatedNotes.content,
                userID: updatedNotes.userID
            }
        })
    }
    catch (err) {
        res.status(404).json({
            status: "Failed",
            message: err.message
        })
    }

})


export default router;
