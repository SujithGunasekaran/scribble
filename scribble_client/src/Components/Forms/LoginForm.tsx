import React from 'react';
import { Link } from 'react-router-dom';
import { FormProps } from '../../form.model';

const LoginForm: React.FC<FormProps> = (props) => {

    const { formField, formError, loading, handleInputChange, handleFormSubmit } = props;

    return (
        <>
            <div className="form_model_heading">Login</div>
            <form onSubmit={handleFormSubmit} id="login">
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
                <div className="form_model_forgot">
                    <Link to="/ForgotPassword" href="/ForgotPassword">Forgot Password ?</Link>
                </div>
                <button disabled={loading ? true : false} className={loading ? "form_model_btn_loading" : "form_model_btn"}>{loading ? 'Signing In' : 'Signin'}</button>
                <div className="form_model_create">
                    Don't have an account ?
                     <Link to="/signup" href="/signup"> Signup</Link>
                </div>
            </form>
        </>
    )
}

export default LoginForm;
