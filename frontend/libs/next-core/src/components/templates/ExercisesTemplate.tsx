import { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useReturnWordsToExercisesMutation, useTranslate } from '../../hooks';
import { fetchClient } from '../../providers';
import { Button } from '../atoms';

export const ExercisesTemplate = () => {
  const { t } = useTranslate();

  const [returnCount, setReturnCount] = useState(0);

  const { mutate: returnWords, isLoading } = useReturnWordsToExercisesMutation();

  useEffect(() => {
    fetchClient
      .get('words/index-return-to-exercises')
      .then((res) => {
        setReturnCount(res.data.count);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Box>
      <Typography fontWeight="bold" mb={2}>
        Exercises
      </Typography>

      <Grid mb={2} container gap={5}>
        <Button href="/ex/biatlon">{t('exercises.biatlon')}</Button>
        <Button href="/ex/lenta">{t('exercises.lenta')}</Button>
      </Grid>
      <Typography mb={2}>After word moved to next level it dissapears from exercises.</Typography>
      <Grid container gap={2} alignItems="center">
        <Button onClick={() => returnWords()} loading={isLoading} disabled={!returnCount}>
          Return words to exercises
        </Button>
        <Typography color="text.secondary">
          (Currently you can return {returnCount} words)
        </Typography>
      </Grid>
    </Box>
  );
};
