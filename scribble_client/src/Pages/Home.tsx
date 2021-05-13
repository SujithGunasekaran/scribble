import React, { Suspense, lazy, useState } from 'react';
import '../Css/home.css';
import AddIcon from '@material-ui/icons/Add';
import { useForm } from '../Hooks/useForm';

const NoteListItem = lazy(() => import('../Components/NoteList/NoteListItem'));
const NoteWrapper = lazy(() => import('../Components/NoteList/NoteWrapper'));

const Home: React.FC = () => {

    const [isNeedToEditNote, setIsNeedToEditNote] = useState<Boolean>(true);
    const [currentComponent, setCurrentComponent] = useState<string>('editnote');

    // Hooks
    const { formField, handleInputChange } = useForm();

    const handleComponentChange = (componentName: string) => {
        setCurrentComponent((prevCurrentComponent) => {
            let currentComponent = prevCurrentComponent;
            currentComponent = componentName;
            return currentComponent;
        })
    }

    return (
        <div>
            <div className="home_main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="home_container">
                                <div className="home_note_list">
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <NoteListItem />
                                    </Suspense>
                                </div>
                                <div className="home_note_edit">
                                    <div className="home_note_edit_header_container">
                                        <div className={`home_note_edit_header ${currentComponent === 'editnote' && 'note_active'}`} onClick={() => handleComponentChange('editnote')}>Edit</div>
                                        <div className={`home_note_edit_header ${currentComponent === 'preview' && 'note_active'}`} onClick={() => handleComponentChange('preview')}>Preview</div>
                                    </div>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <NoteWrapper
                                            currentComponent={currentComponent}
                                            formField={formField}
                                            handleInputChange={handleInputChange}
                                        />
                                    </Suspense>
                                </div>
                            </div>
                            <div className="add_container">
                                <AddIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
