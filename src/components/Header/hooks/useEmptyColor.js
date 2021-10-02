import { useState } from 'react';

export const useEmptyColor = () => {
    const [ emptyColor, setEmptyColor ] = useState('');

    return { emptyColor, setEmptyColor };
}