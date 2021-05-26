import React from "react";

export interface dynamicObject {
    [key: string]: any
}

export interface noteList {
    noteList: any,
    handleViewNotes: (noteInfo: dynamicObject) => void,
    handleDelete: (e: Event | React.MouseEvent<SVGSVGElement, MouseEvent>, id: string) => void
}

export interface FormProps {
    handleResetField?: any
    userChecked?: boolean
    loading?: boolean,
    isNeedToEditNote?: boolean,
    currentComponent?: string | undefined,
    formError?: dynamicObject | undefined,
    formField?: dynamicObject,
    handleInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleFormSubmit?: (e: React.FormEvent) => void
    handleSaveForm?: (e: React.FormEvent) => void
}
