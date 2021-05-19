import React, { Suspense, useState } from 'react';
import { useForm } from '../Hooks/useForm';
import { useFetch } from '../Hooks/useFetch';
import { userBaseURL } from '../config';
import SignupForm from '../Components/Forms/SignupForm';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';
import '../Css/form.css';


const Signup: React.FC = () => {

    const [successUser, setSuccessUser] = useState<string | null>(null);

    // hooks
    const { formField, formError, setFormField, setFormError, handleInputChange, checkValidation } = useForm();
    const { loading, apiError, postData, setApiError } = useFetch();

    const { url } = userBaseURL;

    const resetForm = () => {
        setFormField({});
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const canProceed = checkValidation("auth");
        if (canProceed) {
            try {
                const response = await postData(`${url}/signup`, formField, false);
                if (response.status === "Success") {
                    setSuccessUser(response.message);
                }
            }
            catch (err) {
                setApiError('Email already Exist');
            }
            finally {
                setFormError({});
                resetForm();
            }
        }
    }


    return (
        <div className="form_main">
            {
                apiError &&
                <div className="form_error_alert">
                    {apiError}
                    <span className="form_error_alert_cancel">
                        <CloseIcon style={{ fontSize: '1.1rem' }} onClick={() => setApiError(null)} />
                    </span>
                </div>
            }
            {
                successUser &&
                <div className="form_success_alert">
                    {successUser}
                    <span className="form_success_alert_cancel">
                        <CloseIcon style={{ fontSize: '1.1rem' }} onClick={() => setSuccessUser(null)} />
                    </span>
                </div>
            }
            <div className="form_model_container">
                <Suspense fallback={<div>Loading...</div>}>
                    <SignupForm
                        loading={loading}
                        formError={formError}
                        formField={formField}
                        handleInputChange={handleInputChange}
                        handleFormSubmit={handleFormSubmit}
                    />
                </Suspense>
            </div>
        </div>
    )
}

export default withRouter(Signup);
