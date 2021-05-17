import React from 'react';
import { Link } from 'react-router-dom';
import { FormProps } from '../../form.model';


const SignupForm: React.FC<FormProps> = (props) => {

    const { formField, formError, handleInputChange, handleFormSubmit } = props;

    return (
        <>
            <div className="form_model_heading">Create Account</div>
            <form onSubmit={handleFormSubmit} id="signup">
                <div className="form_model_label">Email</div>
                <input
                    className="form_model_input"
                    name="email"
                    type="email"
                    value={formField?.email ?? ''}
                    onChange={handleInputChange}
                />
                {
                    formError?.emailError &&
                    <div className="form_input_error">{formError.emailError}</div>
                }
                <div className="form_model_label">Password</div>
                <input
                    className="form_model_input"
                    name="password"
                    type="password"
                    value={formField?.password ?? ''}
                    onChange={handleInputChange}
                />
                {
                    formError?.passwordError &&
                    <div className="form_input_error">{formError.passwordError}</div>
                }
                <button className="form_model_btn">Create Account</button>
                <div className="form_model_create">
                    Already have an account ?
                     <Link to="/login" href="/login"> Signin</Link>
                </div>
            </form>
        </>
    )
}

export default SignupForm;
