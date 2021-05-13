import React, { Suspense } from 'react';
import { components } from '../../UtilsComponent';
import { FormProps } from '../../form.model';

const NoteWrapper: React.FC<FormProps> = (props) => {

    const { currentComponent, formField, handleInputChange } = props;

    const Component = components[currentComponent.toLocaleLowerCase()];

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Component
                    formField={formField}
                    handleInputChange={handleInputChange}
                />
            </Suspense>
        </div>
    )
}

export default NoteWrapper;
