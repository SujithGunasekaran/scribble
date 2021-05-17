import React from "react";

export interface dynamicObject {
    [key: string]: any
}

export interface noteList {
    noteList: any
}

export interface FormProps {
    currentComponent?: string | undefined,
    formError?: dynamicObject | undefined,
    formField?: dynamicObject,
    handleInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleFormSubmit?: (e: React.FormEvent) => void
    handleSaveForm?: (e: React.FormEvent) => void
}
