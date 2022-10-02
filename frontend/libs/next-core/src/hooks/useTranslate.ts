import { useCallback } from 'react';

// TODO: implement useTransate hook
export const useTranslate = () => {
  const t = useCallback((key: string) => {
    return key;
  }, []);

  return {
    t,
  };
};
