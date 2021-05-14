import React from 'react';
import { Link } from 'react-router-dom';
import { FormProps } from '../../form.model';

const LoginForm: React.FC<FormProps> = (props) => {

    const { formField, handleInputChange, handleFormSubmit } = props;

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
                <div className="form_model_label">Password</div>
                <input
                    className="form_model_input"
                    name="password"
                    type="password"
                    value={formField?.password ?? ''}
                    onChange={handleInputChange}
                />
                <div className="form_model_forgot">
                    <Link to="/" href="/">Forgot Password ?</Link>
                </div>
                <button className="form_model_btn">Singin</button>
                <div className="form_model_create">
                    Don't have an account ?
                     <Link to="/signup" href="/signup"> Signup</Link>
                </div>
            </form>
        </>
    )
}

export default LoginForm;
