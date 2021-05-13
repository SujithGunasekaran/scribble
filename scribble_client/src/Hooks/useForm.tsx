import React, { useState } from 'react';
import { dynamicObject } from '../form.model';

export const useForm = () => {

    const [formField, setFormField] = useState<dynamicObject>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormField((prevFormField) => {
            let formField = JSON.parse(JSON.stringify(prevFormField));
            formField[e.target.name] = e.target.value;
            return formField;
        })
    }

    return { formField, handleInputChange }

}
