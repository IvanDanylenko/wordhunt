import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useGetUser, useReturnWordsToExercisesMutation, useTranslate } from '../../hooks';
import { fetchClient } from '../../providers';
import { Button } from '../atoms';

export const ExercisesTemplate = () => {
  const { t } = useTranslate();

  const [returnCount, setReturnCount] = useState(0);

  const router = useRouter();

  const { mutate: returnWords, isLoading } = useReturnWordsToExercisesMutation();

  const { data: user } = useGetUser();

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

  useEffect(() => {
    const handleNavigateToExercise = (e: KeyboardEvent) => {
      if (e.code === 'Digit1') {
        router.push('/ex/biatlon');
      } else if (e.code === 'Digit2') {
        router.push('/ex/lenta');
      }
    };

    window.addEventListener('keydown', handleNavigateToExercise);

    return () => {
      window.removeEventListener('keydown', handleNavigateToExercise);
    };
  }, [router]);

  return (
    <Box>
      <Typography fontWeight="bold" mb={2}>
        Exercises
      </Typography>

      <Grid mb={2} container gap={5}>
        <Button href="/ex/biatlon" title="Key 1">
          {t('exercises.biatlon')}
        </Button>
        <Button href="/ex/lenta" title="Key 2">
          {t('exercises.lenta')}
        </Button>
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
      {user?.word_statistics && (
        <Box mt={4}>
          <Typography fontWeight="bold">Statistics</Typography>
          <Table sx={{ maxWidth: 300 }}>
            <TableHead>
              <TableRow>
                <TableCell>Level</TableCell>
                <TableCell>Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.word_statistics.map((item) => {
                return (
                  <TableRow key={item.level}>
                    <TableCell>{item.level}</TableCell>
                    <TableCell>{item.count}</TableCell>
                  </TableRow>
                );
              })}
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>Total:</TableCell>
                <TableCell>
                  {user.word_statistics.reduce((res, item) => res + item.count, 0)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      )}
    </Box>
  );
};
