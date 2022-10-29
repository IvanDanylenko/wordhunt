import { Box, Typography, Grid } from '@mui/material';
import { useReturnWordsToExercisesMutation, useTranslate } from '../../hooks';
import { Button } from '../atoms';

export const ExercisesTemplate = () => {
  const { t } = useTranslate();

  const { mutate: returnWords, isLoading } = useReturnWordsToExercisesMutation();

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
      <Button onClick={() => returnWords()} loading={isLoading}>
        Return words to exercises
      </Button>
    </Box>
  );
};
