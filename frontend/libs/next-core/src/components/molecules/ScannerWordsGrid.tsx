import { useGetWords } from '../../hooks';

export const ScannerWordsGrid = () => {
  const { data: words } = useGetWords();
  console.log('🚀 ~ words', words);
  return 'hi';
};
