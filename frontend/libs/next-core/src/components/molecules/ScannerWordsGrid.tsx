import { FC } from 'react';
import { Grid, Alert, Typography } from '@mui/material';
import { useScannerTabContext } from '../../contexts';
import { useGetWords } from '../../hooks';
import { Loader, WordRadioInputView, WordRadioInputViewProps } from '../atoms';

export const ScannerWordsGrid: FC = () => {
  const { data: words, isLoading, error } = useGetWords();

  const { unknownIds, knownIds, addKnownId, addUnknownId, removeId } = useScannerTabContext();

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!words?.length) {
    return (
      <Grid container justifyContent="center">
        <Typography>Empty...</Typography>
      </Grid>
    );
  }

  return (
    <Grid container spacing={1}>
      {words?.map((word) => {
        const wordStatus: WordRadioInputViewProps['status'] = knownIds.includes(word.id)
          ? 'known'
          : unknownIds.includes(word.id)
          ? 'unknown'
          : 'none';
        return (
          <Grid key={word.id} item xs={6} sm={4} md={3}>
            <WordRadioInputView
              word={word.name}
              status={wordStatus}
              onChange={(status) => {
                if (status === 'known') {
                  addKnownId(word.id);
                } else if (status === 'unknown') {
                  addUnknownId(word.id);
                } else {
                  removeId(word.id);
                }
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
