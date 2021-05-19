import React, { Suspense } from 'react';
import { useForm } from '../Hooks/useForm';
import LoginForm from '../Components/Forms/LoginForm';
import { useFetch } from '../Hooks/useFetch';
import { userBaseURL } from '../config';
import { Redirect } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import '../Css/form.css';


const Form: React.FC = () => {

    // hooks
    const { formField, formError, handleInputChange, checkValidation, setFormError } = useForm();

    const { loading, apiError, postData, setApiError } = useFetch();

    const { url } = userBaseURL;

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const canProceed = checkValidation("auth");
        if (canProceed) {
            try {
                const response = await postData(`${url}/login`, formField, false);
                if (response.status === "Success") {
                    sessionStorage.setItem('userToken', response.token);
                    sessionStorage.setItem('userID', response.userInfo.id);
                    sessionStorage.setItem('email', response.userInfo.email);
                }
            }
            catch (err) {
                setApiError('Invalid email or password');
            }
            finally {
                setFormError({});
            }
        }
    }

    if (sessionStorage.getItem('userToken')) {
        return <Redirect to="/home" />
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
            <div className="form_model_container">
                <Suspense fallback={<div>Loading...</div>}>
                    <LoginForm
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

export default Form
