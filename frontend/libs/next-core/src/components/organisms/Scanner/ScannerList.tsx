import { Button } from '../../atoms';
import { ScannerWordsGrid } from '../../molecules';

export const ScannerList = () => {
  return (
    <>
      <ScannerWordsGrid />
      <Button>Save statuses</Button>
    </>
  );
};
