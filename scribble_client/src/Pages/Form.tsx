import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { formComponent } from '../UtilsComponent';
import { useForm } from '../Hooks/useForm';
import '../Css/form.css';


const Form: React.FC = () => {

    // hooks
    const { formField, handleInputChange, handleFormSubmit } = useForm();

    const formName = useLocation();

    const Form = formComponent[formName.pathname.slice(1).toLocaleLowerCase()];

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 mx-auto form_container">
                        <div className="form_model_container">
                            <Suspense fallback={<div>Loading...</div>}>
                                <Form
                                    formField={formField}
                                    handleInputChange={handleInputChange}
                                    handleFormSubmit={handleFormSubmit}
                                />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form
