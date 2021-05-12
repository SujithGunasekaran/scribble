import React, { Suspense, lazy } from 'react';
import '../Css/home.css';
import AddIcon from '@material-ui/icons/Add';

const NoteListItem = lazy(() => import('../Components/NoteList/NoteListItem'));

const Home: React.FC = () => {
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
                                    <input
                                        className="home_note_edit_title_input"
                                        placeholder="Title"
                                    />
                                    <textarea
                                        className="home_note_edit_content"
                                        placeholder="Scribble your notes with markdowns..."
                                    />
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
