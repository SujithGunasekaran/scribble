import React, { memo } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { noteList } from '../../form.model';

const NoteListItem: React.FC<noteList> = memo((props) => {
    const { noteList } = props;
    return (
        <React.Fragment>
            {
                noteList.length > 0 &&
                noteList.map((noteInfo: any, index: any) => (
                    <div className="home_note_list_container" key={index}>
                        <div className="home_note_head_container">
                            <div className="home_note_list_title">{noteInfo.title}</div>
                            <div className="home_note_head_icon_display">
                                <div>
                                    <EditIcon className="home_note_list_edit_btn" />
                                </div>
                                <div>
                                    <DeleteIcon className="home_note_list_delete_btn" />
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
