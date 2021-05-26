import React from 'react';
import { FormProps } from '../../form.model';

const ForgotForm: React.FC<FormProps> = (props) => {

    const { formField, formError, loading, userChecked, handleInputChange, handleFormSubmit, handleResetField } = props;

    return (
        <>
            <div className="form_model_heading">Reset Password</div>
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
                {
                    userChecked &&
                    <>
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
                    </>
                }
                <div className="form_btn_display">
                    {
                        userChecked &&
                        <div className="form_back_btn" onClick={() => handleResetField()}>Back</div>
                    }
                    {
                        userChecked ?
                            <button disabled={loading ? true : false} style={{ marginLeft: 'auto' }} className={loading ? "form_forgot_btn_loading" : "form_forgot_btn"}>{loading ? 'Reseting..' : 'Reset'}</button>
                            :
                            <button disabled={loading ? true : false} style={{ marginLeft: 'auto' }} className={loading ? "form_forgot_btn_loading" : "form_forgot_btn"}>{loading ? 'Checking..' : 'Check'}</button>
                    }
                </div>
            </form>
        </>
    )
}

export default ForgotForm;
