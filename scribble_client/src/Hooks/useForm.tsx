import React, { useState } from 'react';
import { dynamicObject } from '../form.model';

export const useForm = () => {

    const [formField, setFormField] = useState<dynamicObject>({});
    const [formError, setFormError] = useState<dynamicObject>({});

    const authForm = ["email", "password"];
    const noteForm = ["title", "content"];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormField((prevFormField) => {
            let formField = JSON.parse(JSON.stringify(prevFormField));
            formField[e.target.name] = e.target.value;
            return formField;
        })
        if (formError[`${e.target.name}Error`]) {
            setFormError((prevError) => {
                let formError = JSON.parse(JSON.stringify(prevError));
                formError[`${e.target.name}Error`] = "";
                return formError;
            })
        }
    }

    const checkValidation = (formType: string) => {
        let result = true;
        let formInput = formType === 'auth' ? authForm : noteForm;
        formInput.forEach((fieldName) => {
            if (!formField[fieldName] && fieldName === "title" && formType === "notes") {
                setFormError((prevError) => {
                    let formError = JSON.parse(JSON.stringify(prevError));
                    formError[`${fieldName}Error`] = 'Please Enter Title';
                    return formError;
                })
                result = false;
            }
            if (!formField[fieldName] && fieldName === "content" && formType === "notes") {
                setFormError((prevError) => {
                    let formError = JSON.parse(JSON.stringify(prevError));
                    formError[`${fieldName}Error`] = 'Please Enter content';
                    return formError;
                })
                result = false;
            }
            if (!formField[fieldName] && fieldName === "email" && formType === "auth") {
                setFormError((prevError) => {
                    let formError = JSON.parse(JSON.stringify(prevError));
                    formError[`${fieldName}Error`] = 'Please Enter Email Address';
                    return formError;
                })
                result = false;
            }
            if (!formField[fieldName] && fieldName === "password" && formType === "auth") {
                setFormError((prevError) => {
                    let formError = JSON.parse(JSON.stringify(prevError));
                    formError[`${fieldName}Error`] = 'Please Enter Password';
                    return formError;
                })
                result = false;
            }
        })
        return result;
    }

    return { formField, formError, handleInputChange, setFormError, checkValidation }

}
