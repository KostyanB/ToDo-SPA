import { useState } from 'react';
import env from '../../../env.json';

export const useForm = () => {
    const { initTitle, initHolder } = env.formElem;
    const [ form, setForm ] = useState({
        title: initTitle,
        holder: initHolder,
    });

    return { form, setForm };
}