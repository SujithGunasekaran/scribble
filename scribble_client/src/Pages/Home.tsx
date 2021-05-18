import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { useForm } from '../Hooks/useForm';
import { Redirect } from 'react-router';
import { useFetch } from '../Hooks/useFetch';
import { noteBaseURL } from '../config';
import CloseIcon from '@material-ui/icons/Close';
import '../Css/home.css';
import '../Css/form.css';

const Header = lazy(() => import('../Components/Header'));
const NoteListItem = lazy(() => import('../Components/NoteList/NoteListItem'));
const NoteWrapper = lazy(() => import('../Components/NoteList/NoteWrapper'));

const Home: React.FC = () => {

    const [isNeedToEditNote, setIsNeedToEditNote] = useState<boolean>(true);
    const [currentComponent, setCurrentComponent] = useState<string>('editnote');
    const [noteList, setNoteList] = useState<any>([]);
    const [noteID, setNoteID] = useState<string | null>(null);

    // Hooks
    const { formField, formError, setFormError, handleInputChange, checkValidation, setFormField } = useForm();
    const { loading, apiError, getData, postData, setApiError } = useFetch();

    const { url } = noteBaseURL;

    const resetNotes = () => {
        setFormField({});
        setFormError({});
        setApiError(null);
    }

    const getNoteList = async () => {
        if (sessionStorage.getItem('userToken')) {
            try {
                const userID = sessionStorage.getItem('userID');
                const response = await getData(`${url}/getnotes/${userID}`, true);
                setNoteList(response.notes);
            }
            catch (err) {
                setApiError('Something Went wrong..')
            }
            finally {
                setFormError({});
            }
        }
    }

    useEffect(() => {
        getNoteList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleComponentChange = (componentName: string) => {
        setCurrentComponent((prevCurrentComponent) => {
            let currentComponent = prevCurrentComponent;
            currentComponent = componentName;
            return currentComponent;
        })
    }

    const handleSaveForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const canProceed = checkValidation('notes');
        let userID = sessionStorage.getItem('userID');
        if (canProceed && noteID === null) {
            let data = {
                ...formField,
                userID
            }
            try {
                const response = await postData(`${url}/createNote`, data, true);
                if (response.status === "Success") {
                    setNoteList((prevNoteList: any) => {
                        let noteList = JSON.parse(JSON.stringify(prevNoteList));
                        noteList = [
                            ...noteList,
                            response.notes
                        ];
                        return noteList;
                    })
                }
            }
            catch (err) {
                setApiError('Something went wrong');
            }
            finally {
                resetNotes();
            }
        }
        if (canProceed && noteID) {
            let data = {
                ...formField,
                userID
            }
            try {
                const response = await postData(`${url}/upateNote/${noteID}`, data, true);
                if (response.status === "Success") {
                    setNoteList((prevNoteList: any) => {
                        let noteList = JSON.parse(JSON.stringify(prevNoteList));
                        let index = noteList.findIndex((noteID: any) => noteID._id === response.notes._id);
                        noteList[index] = response.notes;
                        return noteList;
                    })
                }
            }
            catch (err) {
                setApiError('Something went wrong');
            }
            finally {
                setFormError({});
                setApiError(null);
            }
        }
    }

    const handleViewNotes = useCallback((noteInfo: any) => {
        setFormField((prevFormField) => {
            let formField = JSON.parse(JSON.stringify(prevFormField));
            formField = {
                title: noteInfo.title,
                content: noteInfo.content
            }
            return formField;
        })
        setIsNeedToEditNote(false);
        setCurrentComponent('preview');
        setNoteID((prevNoteID) => {
            let noteID = prevNoteID;
            noteID = noteInfo._id;
            return noteID;
        });

    }, [setFormField, setNoteID])

    const handleDelete = useCallback(async (e: Event | React.MouseEvent<SVGSVGElement, MouseEvent>, id: string) => {
        if (noteID === id) {
            resetNotes();
            setNoteID(null);
            setIsNeedToEditNote(true);
            setCurrentComponent('editnote');
        }
        e.stopPropagation();
        try {
            const response = await postData(`${url}/deleteNote/${id}`, null, true);
            if (response.status === "Success") {
                setNoteList((prevNoteList: any) => {
                    let noteList = JSON.parse(JSON.stringify(prevNoteList));
                    noteList = noteList.filter((noteID: any) => noteID._id !== response.noteID);
                    return noteList;
                })
            }
        }
        catch (err) {
            setApiError('Something went wrong while deleting note');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noteID])

    const handleNewNote = () => {
        setIsNeedToEditNote(true);
        setNoteID(null);
        resetNotes();
        setCurrentComponent('editnote');
    }

    if (!sessionStorage.getItem('userToken')) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <Header />
            <div className="home_main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="home_container">
                                <div className="home_note_list">
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <NoteListItem
                                            noteList={noteList}
                                            handleViewNotes={handleViewNotes}
                                            handleDelete={handleDelete}
                                        />
                                    </Suspense>
                                </div>
                                <div className="home_note_edit">
                                    <div className="home_note_edit_header_container">
                                        <div className={`home_note_edit_header ${currentComponent === 'editnote' && 'note_active'}`} onClick={() => handleComponentChange('editnote')}>Edit</div>
                                        <div className={`home_note_edit_header ${currentComponent === 'preview' && 'note_active'}`} onClick={() => handleComponentChange('preview')}>Preview</div>
                                        {
                                            !isNeedToEditNote &&
                                            <div className="home_note_edit_header" onClick={() => handleNewNote()}>
                                                Add Note
                                            </div>
                                        }
                                    </div>
                                    {
                                        apiError &&
                                        <div className="note_error_alert">
                                            {apiError}
                                            <span className="note_error_alert_cancel">
                                                <CloseIcon style={{ fontSize: '1.1rem' }} onClick={() => setApiError(null)} />
                                            </span>
                                        </div>
                                    }
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <NoteWrapper
                                            loading={loading}
                                            isNeedToEditNote={isNeedToEditNote}
                                            formError={formError}
                                            currentComponent={currentComponent}
                                            formField={formField}
                                            handleInputChange={handleInputChange}
                                            handleSaveForm={handleSaveForm}
                                        />
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
