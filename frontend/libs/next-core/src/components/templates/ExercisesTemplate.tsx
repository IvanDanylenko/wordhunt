import { Box, Typography, Grid } from '@mui/material';
import { useTranslate } from '../../hooks';
import { Button } from '../atoms';

export const ExercisesTemplate = () => {
  const { t } = useTranslate();
  return (
    <Box>
      <Typography fontWeight="bold" mb={2}>
        Exercises
      </Typography>

      <Grid container gap={5}>
        <Button href="/ex/biatlon">{t('exercises.biatlon')}</Button>
        <Button href="/ex/lenta">{t('exercises.lenta')}</Button>
      </Grid>
    </Box>
  );
};
