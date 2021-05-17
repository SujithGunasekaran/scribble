import { lazy } from 'react';

const editnote = lazy(() => import('../Components/NoteList/EditNote'));
const preview = lazy(() => import('../Components/NoteList/Preview'));

export const components: any = {
    editnote,
    preview
};


