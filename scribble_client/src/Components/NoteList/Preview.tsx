import React from 'react';
import Markdown from 'react-markdown';
import { FormProps } from '../../form.model';
import gfm from 'remark-gfm';

const Preview: React.FC<FormProps> = (props) => {

    // props
    const { formField } = props;

    return (
        <div>
            <div className="home_note_edit_title_input">{formField?.title ?? ''}</div>
            <div className="markdown_container">
                <Markdown
                    remarkPlugins={[gfm]}
                >
                    {formField?.content ?? ''}
                </Markdown>
            </div>
        </div>

    )
}

export default Preview;
