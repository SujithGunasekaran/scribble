import React, { useEffect, useRef } from 'react';
import { FormProps } from '../../form.model';

const EditNote: React.FC<FormProps> = (props) => {

    // refs
    const titleRef = useRef<HTMLInputElement>(null);

    //props
    const { formField, handleInputChange } = props;

    useEffect(() => {
        titleRef.current?.focus();
    }, [])

    return (
        <div>
            <form>
                <input
                    ref={titleRef}
                    name="title"
                    className="home_note_edit_title_input"
                    placeholder="Title"
                    value={formField['title']}
                    onChange={handleInputChange}
                />
                <textarea
                    name="content"
                    className="home_note_edit_content"
                    placeholder="Scribble your notes with markdowns..."
                    value={formField["content"]}
                    onChange={handleInputChange}
                />
            </form>
        </div>
    )
}

export default EditNote;
