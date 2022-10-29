import { Typography, Grid, Alert, Button, Divider } from '@mui/material';
import { useRouter } from 'next/router';
import { useGetWords } from '../../hooks';
import { Loader } from '../atoms';

export const LentaTemplate = () => {
  const router = useRouter();

  const { data: words, error, isLoading } = useGetWords({ status: 'in_progress' });

  if (error) {
    return <Alert severity="error">{error.response?.data?.message || error.message}</Alert>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!words) {
    return (
      <>
        <Alert severity="info">Empty...</Alert>
        <Button variant="contained" onClick={() => router.push('/ex')}>
          Exercises list
        </Button>
      </>
    );
  }

  return (
    <>
      <Grid container>
        <Grid item sm={4}>
          <Typography>Character</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography>Example</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 1 }} />
      {words.map((word, index) => {
        const translation = word.translations && word.translations[0];
        const example = word.examples && word.examples[0];
        return (
          <>
            <Grid key={word.id} container spacing={2}>
              <Grid item sm={4}>
                <Typography>
                  {index + 1}. {word.name} ({translation?.word_transcription})
                </Typography>
                <Typography>{translation?.name}</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography>
                  {example?.name} {example ? `(${example.transcription})` : ''}
                </Typography>
                <Typography>{example?.translation}</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 1 }} />
          </>
        );
      })}
    </>
  );
};
