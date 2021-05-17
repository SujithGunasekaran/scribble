import React, { Suspense, lazy, useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
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

    const [isNeedToEditNote, setIsNeedToEditNote] = useState<Boolean>(true);
    const [currentComponent, setCurrentComponent] = useState<string>('editnote');
    const [noteList, setNoteList] = useState<any>([]);

    // Hooks
    const { formField, formError, setFormError, handleInputChange, checkValidation } = useForm();
    const { loading, apiError, getData, postData, setApiError } = useFetch();

    const { url } = noteBaseURL;

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
        let data = {
            ...formField,
            userID
        }
        if (canProceed) {
            try {
                const response = await postData(`${url}/createNote`, data, true);
                if (response.status === "Success") {
                    setNoteList((prevNoteList: any) => {
                        let noteList = JSON.parse(JSON.stringify(prevNoteList));
                        noteList = [
                            ...noteList,
                            response.notes
                        ]
                        return noteList;
                    })
                }
            }
            catch (err) {
                setApiError('Something went wrong');
            }
            finally {
                setFormError({})
            }
        }
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
                                        />
                                    </Suspense>
                                </div>
                                <div className="home_note_edit">
                                    <div className="home_note_edit_header_container">
                                        <div className={`home_note_edit_header ${currentComponent === 'editnote' && 'note_active'}`} onClick={() => handleComponentChange('editnote')}>Edit</div>
                                        <div className={`home_note_edit_header ${currentComponent === 'preview' && 'note_active'}`} onClick={() => handleComponentChange('preview')}>Preview</div>
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
                                            formError={formError}
                                            currentComponent={currentComponent}
                                            formField={formField}
                                            handleInputChange={handleInputChange}
                                            handleSaveForm={handleSaveForm}
                                        />
                                    </Suspense>
                                </div>
                            </div>
                            {
                                !isNeedToEditNote &&
                                <div className="add_container">
                                    <AddIcon />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
