import { FC } from 'react';
import { useGetWords } from '../../hooks';

export const ScannerWordsGrid: FC = () => {
  const { data: words } = useGetWords();
  console.log('🚀 ~ words', words);
  return <>'hi'</>;
};
