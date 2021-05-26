import React, { lazy, Suspense, useState } from 'react';
import { useForm } from '../Hooks/useForm';
import { useFetch } from '../Hooks/useFetch';
import { userBaseURL } from '../config';
import CloseIcon from '@material-ui/icons/Close';
import '../Css/form.css';


const ForgotForm = lazy(() => import('../Components/Forms/ForgotForm'));

const ForgotPassword: React.FC = () => {

    const [userChecked, setUserChecked] = useState<boolean>(false);
    const [successUser, setSuccessUser] = useState<string | null>(null);

    // hooks
    const { formField, formError, handleInputChange, checkValidation, setFormError } = useForm();

    const { loading, apiError, postData, setApiError } = useFetch();

    const { url } = userBaseURL;

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userChecked) {
            if (!formField.email) setFormError({ emailError: 'Please Enter Email' })
            if (formField.email) {
                console.log("Hello", formField.email);
                try {
                    const response = await postData(`${url}/checkUser`, formField, false);
                    if (response.status === "Success") {
                        setUserChecked(true)
                    }
                }
                catch (err) {
                    setApiError('Invalid email');
                }
                finally {
                    setFormError({});
                }
            }
        }
        else {
            const canProceed = checkValidation("auth");
            if (canProceed) {
                try {
                    const response = await postData(`${url}/resetPassword`, formField, false);
                    if (response.status === "Success") {
                        setSuccessUser('Password Updated Successfully');
                    }
                }
                catch (err) {
                    setApiError('Something Went Wrong');
                }
                finally {
                    setFormError({})
                }
            }
        }
    }

    const handleResetField = () => {
        setUserChecked(false);
    }

    return (
        <div className="form_main">
            {
                successUser &&
                <div className="form_success_alert">
                    {successUser}
                    <span className="form_success_alert_cancel">
                        <CloseIcon style={{ fontSize: '1.1rem' }} onClick={() => setSuccessUser(null)} />
                    </span>
                </div>
            }
            {
                apiError &&
                <div className="form_error_alert">
                    {apiError}
                    <span className="form_error_alert_cancel">
                        <CloseIcon style={{ fontSize: '1.1rem' }} onClick={() => setApiError(null)} />
                    </span>
                </div>
            }
            <div className="form_model_container">
                <Suspense fallback={<div>Loading...</div>}>
                    <ForgotForm
                        handleResetField={handleResetField}
                        loading={loading}
                        userChecked={userChecked}
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

export default ForgotPassword;
