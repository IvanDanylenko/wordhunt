/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, createContext, ReactNode, useCallback, useState, useContext } from 'react';
import { useGetWords } from '../hooks/queries/useGetWords';

export type ScannerTabContextType = {
  knownIds: string[];
  unknownIds: string[];
  addKnownId: (id: string) => void;
  addUnknownId: (id: string) => void;
  removeId: (id: string) => void;
  moveAllToKnown: () => void;
  moveAllToUnknown: () => void;
};

export const ScannerTabContext = createContext<ScannerTabContextType>({
  knownIds: [],
  unknownIds: [],
  addKnownId: () => {},
  addUnknownId: () => {},
  removeId: () => {},
  moveAllToKnown: () => {},
  moveAllToUnknown: () => {},
});

export interface ScannerTabContextProviderProps {
  children: ReactNode;
}

export const ScannerTabContextProvider: FC<ScannerTabContextProviderProps> = ({ children }) => {
  const { data: words } = useGetWords();

  const [knownIds, setKnownIds] = useState<string[]>([]);
  const [unknownIds, setUnknownIds] = useState<string[]>([]);

  const addKnownId = useCallback<ScannerTabContextType['addKnownId']>((id) => {
    setKnownIds((ids) => [...ids, id]);
    setUnknownIds((ids) => ids.filter((wordId) => wordId !== id));
  }, []);

  const addUnknownId = useCallback<ScannerTabContextType['addUnknownId']>((id) => {
    setKnownIds((ids) => ids.filter((wordId) => wordId !== id));
    setUnknownIds((ids) => [...ids, id]);
  }, []);

  const removeId = useCallback<ScannerTabContextType['removeId']>((id) => {
    setKnownIds((ids) => ids.filter((wordId) => wordId !== id));
    setUnknownIds((ids) => ids.filter((wordId) => wordId !== id));
  }, []);

  const moveAllToKnown = useCallback<ScannerTabContextType['moveAllToKnown']>(() => {
    const allWords = words?.map((word) => word.id) || [];

    setKnownIds(allWords);
    setUnknownIds([]);
  }, [words]);

  const moveAllToUnknown = useCallback<ScannerTabContextType['moveAllToUnknown']>(() => {
    const allWords = words?.map((word) => word.id) || [];

    setKnownIds([]);
    setUnknownIds(allWords);
  }, [words]);

  return (
    <ScannerTabContext.Provider
      value={{
        knownIds,
        unknownIds,
        addKnownId,
        addUnknownId,
        removeId,
        moveAllToKnown,
        moveAllToUnknown,
      }}
    >
      {children}
    </ScannerTabContext.Provider>
  );
};

export const useScannerTabContext = () => useContext(ScannerTabContext);
