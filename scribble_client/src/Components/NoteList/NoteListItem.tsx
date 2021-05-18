import React, { memo } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { noteList } from '../../form.model';

const NoteListItem: React.FC<noteList> = memo((props) => {
    const { noteList, handleViewNotes, handleDelete } = props;
    return (
        <React.Fragment>
            {
                noteList.length > 0 &&
                noteList.map((noteInfo: any, index: any) => (
                    <div className="home_note_list_container" key={index} onClick={() => handleViewNotes(noteInfo)}>
                        <div className="home_note_head_container">
                            <div className="home_note_list_title">{noteInfo.title}</div>
                            <div className="home_note_head_icon_display">
                                <div>
                                    <DeleteIcon className="home_note_list_delete_btn" onClick={(e) => handleDelete(e, noteInfo._id)} />
                                </div>
                            </div>
                        </div>
                        <div className="home_note_list_content">{`${noteInfo.content.substr(0, 20)}...`}</div>
                    </div>
                ))
            }
        </React.Fragment>
    )
})

export default NoteListItem;
