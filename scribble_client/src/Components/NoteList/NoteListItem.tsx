import React from 'react';


const NoteListItem: React.FC = () => {
    return (
        <React.Fragment>
            {
                [...Array(20)].map((_index) => (
                    <div className="home_note_list_container">
                        <div className="home_note_list_title">Title</div>
                        <div className="home_note_list_content">Content goes here...</div>
                    </div>
                ))
            }
        </React.Fragment>
    )
}

export default NoteListItem;
