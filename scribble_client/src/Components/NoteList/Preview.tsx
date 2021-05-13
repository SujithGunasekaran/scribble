import React from 'react';
import Markdown from 'react-markdown';
import { FormProps } from '../../form.model';

const Preview: React.FC<FormProps> = (props) => {

    // props
    const { formField } = props;

    return (
        <div className="markdown_container">
            <Markdown>
                {formField?.content ?? ''}
            </Markdown>
        </div>
    )
}

export default Preview;
