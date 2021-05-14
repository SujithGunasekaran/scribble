import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const NoteListItem: React.FC = () => {
    return (
        <React.Fragment>
            {
                [...Array(20)].map((_index) => (
                    <div className="home_note_list_container">
                        <div className="home_note_head_container">
                            <div className="home_note_list_title">Title</div>
                            <div className="home_note_head_icon_display">
                                <div>
                                    <EditIcon className="home_note_list_edit_btn" />
                                </div>
                                <div>
                                    <DeleteIcon className="home_note_list_delete_btn" />
                                </div>
                            </div>
                        </div>
                        <div className="home_note_list_content">Content goes here...</div>
                    </div>
                ))
            }
        </React.Fragment>
    )
}

export default NoteListItem;
