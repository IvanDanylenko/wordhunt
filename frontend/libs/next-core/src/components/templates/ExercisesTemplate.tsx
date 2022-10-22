import { Box, Typography } from '@mui/material';
import { useTranslate } from '../../hooks';
import { Button } from '../atoms';

export const ExercisesTemplate = () => {
  const { t } = useTranslate();
  return (
    <Box>
      <Typography fontWeight="bold">Exercises</Typography>
      <Button href="/ex/biatlon">{t('exercises.biatlon')}</Button>
    </Box>
  );
};
