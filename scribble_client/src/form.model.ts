export interface dynamicObject {
    [key: string]: any
}

export interface FormProps {
    currentComponent: string,
    formField: dynamicObject,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleFormSubmit?: (e: React.FormEvent) => void
}
