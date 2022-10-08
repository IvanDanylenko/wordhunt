import { Divider } from '@mui/material';
import { useRouter } from 'next/router';
import { AddToExercisesButton, SaveStatusesButton } from '../../atoms';
import { ScannerWordsGrid } from '../../molecules';

export const ScannerList = () => {
  const { query } = useRouter();

  return (
    <>
      <ScannerWordsGrid />
      <Divider sx={{ my: 2 }} />
      <SaveStatusesButton />
      <Divider sx={{ my: 2 }} />
      {query.scannerPage === 'unknown' && <AddToExercisesButton />}
    </>
  );
};
