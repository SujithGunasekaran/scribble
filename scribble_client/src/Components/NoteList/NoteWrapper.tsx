import React, { Suspense } from 'react';
import { components } from '../../UtilsComponent';
import { FormProps } from '../../form.model';

const NoteWrapper: React.FC<FormProps> = (props) => {

    const { currentComponent, formField, formError, handleInputChange, handleSaveForm } = props;

    const Component = currentComponent ? components[currentComponent.toLocaleLowerCase()] : null;

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                {
                    Component &&
                    <Component
                        formError={formError}
                        formField={formField}
                        handleInputChange={handleInputChange}
                        handleSaveForm={handleSaveForm}
                    />
                }
            </Suspense>
        </div>
    )
}

export default NoteWrapper;
