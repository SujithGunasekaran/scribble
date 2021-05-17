import React, { Suspense, useState } from 'react';
import { useForm } from '../Hooks/useForm';
import { useFetch } from '../Hooks/useFetch';
import { userBaseURL } from '../config';
import SignupForm from '../Components/Forms/SignupForm';
import CloseIcon from '@material-ui/icons/Close';
import { Redirect, withRouter } from 'react-router-dom';
import '../Css/form.css';


const Signup: React.FC = () => {

    const [successUser, setSuccessUser] = useState<boolean>(false);

    // hooks
    const { formField, formError, setFormError, handleInputChange, checkValidation } = useForm();
    const { loading, apiError, postData, setApiError } = useFetch();

    const { url } = userBaseURL;

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const canProceed = checkValidation("auth");
        if (canProceed) {
            try {
                const response = await postData(`${url}/signup`, formField, false);
                if (response.status === "Success") {
                    setSuccessUser(true);
                }
            }
            catch (err) {
                setApiError('Email already Exist');
            }
            finally {
                setFormError({});
            }
        }
    }

    if (!loading && successUser) {
        return <Redirect to="/login" />
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 mx-auto form_container">
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
                                <SignupForm
                                    formError={formError}
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

export default withRouter(Signup);
