import { lazy } from 'react';

const editnote = lazy(() => import('../Components/NoteList/EditNote'));
const preview = lazy(() => import('../Components/NoteList/Preview'));

// form component
const login = lazy(() => import('../Components/Forms/LoginForm'));
const signup = lazy(() => import('../Components/Forms/SignupForm'));

export const components: any = {
    editnote,
    preview
};

export const formComponent: any = {
    login,
    signup
}

