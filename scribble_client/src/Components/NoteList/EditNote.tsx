import React, { useEffect, useRef } from 'react';
import { FormProps } from '../../form.model';
import '../../Css/form.css';

const EditNote: React.FC<FormProps> = ({ formField, formError, handleInputChange, handleSaveForm }) => {

    // refs
    const titleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        titleRef.current?.focus();
    }, [])

    return (
        <div>
            <form onSubmit={handleSaveForm}>
                <input
                    ref={titleRef}
                    name="title"
                    className="home_note_edit_title_input"
                    placeholder="Title"
                    value={formField?.title ?? ''}
                    onChange={handleInputChange}
                />
                {
                    formError?.titleError &&
                    <div className="form_input_error">{formError.titleError}</div>
                }
                <textarea
                    name="content"
                    className="home_note_edit_content"
                    placeholder="Scribble your notes with markdowns..."
                    value={formField?.content ?? ''}
                    onChange={handleInputChange}
                />
                {
                    formError?.contentError &&
                    <div className="form_input_error">{formError.contentError}</div>
                }
                <button className="home_note_save">Save</button>
            </form>
        </div>
    )
}

export default EditNote;
