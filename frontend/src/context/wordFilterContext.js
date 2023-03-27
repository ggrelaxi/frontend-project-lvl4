import { createContext, useMemo } from 'react';
import * as filter from 'leo-profanity';

export const WordFilterContext = createContext();

export const WordFilterContextProvider = ({ children }) => {
  filter.loadDictionary('ru');

  const contextValue = useMemo(() => ({ wordFilter: filter }), []);

  return <WordFilterContext.Provider value={contextValue}>{children}</WordFilterContext.Provider>;
};
