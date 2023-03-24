import { useContext } from 'react';
import { WordFilterContext } from '../context';

export const useWordFilterContext = () => {
    return useContext(WordFilterContext);
};
