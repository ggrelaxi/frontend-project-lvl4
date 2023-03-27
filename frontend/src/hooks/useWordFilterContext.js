import { useContext } from 'react';
import { WordFilterContext } from '../context';

const useWordFilterContext = () => useContext(WordFilterContext);

export default useWordFilterContext;
