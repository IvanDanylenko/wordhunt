import { useState, useRef, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { Box, Typography, Grid, Alert, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useGetWords, useIncreaseLevelMutation, wordKeys } from '../../hooks';
import { Word } from '../../types';
import { ChineseInput, ChineseInputProps, Loader } from '../atoms';
import { Form } from '../molecules';

const INPUT_NAME = 'chinese';

export const BiatlonTemplate = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const [index, setIndex] = useState(0);

  const [lastPassedWord, setLastPassedWord] = useState<Word | null>(null);

  const [isTypingMistake, setIsTypingMistake] = useState(false);

  const [isMovedToNextLevel, setIsMovedToNextLevel] = useState(false);

  const formRef = useRef<UseFormReturn>(null);

  const {
    data: words,
    error,
    isFetching,
  } = useGetWords({ status: 'in_progress', isRandomOrder: true });

  const { mutate: increaseLevel } = useIncreaseLevelMutation();

  const currentWord = words && words[index];

  const firstTranslation = currentWord?.translations && currentWord.translations[0];

  const firstExample = currentWord?.examples && currentWord.examples[0];

  const moveToNextWord = () => {
    setIndex((v) => v + 1);
    setIsTypingMistake(false);
    setLastPassedWord(null);

    if (formRef.current) {
      formRef.current.setValue(INPUT_NAME, '');
    }
  };

  const handleKeyDown: ChineseInputProps['onKeyDown'] = (e) => {
    if (e.code === 'Enter') {
      moveToNextWord();
    }
  };

  const handleChange: ChineseInputProps['onChange'] = (e) => {
    const value = e.target.value || '';
    const newValue = value.replace(/[a-z\d]/gi, '');

    if (!newValue) {
      return;
    }
    if (!currentWord?.name.startsWith(newValue)) {
      setIsTypingMistake(true);
      if (formRef.current) {
        formRef.current.setValue(INPUT_NAME, '');
      }
    } else if (!isTypingMistake && currentWord?.name === newValue) {
      increaseLevel(currentWord?.id);
      setIsMovedToNextLevel(true);
      setLastPassedWord(currentWord);
      setTimeout(() => {
        setIsMovedToNextLevel(false);
      }, 1000);
    }
  };

  useEffect(() => {
    /**
     * Push to exercises page when exercise finished
     */
    if (words?.length && !currentWord) {
      router.push('/ex');
    }
  }, [words, currentWord, router]);

  useEffect(() => {
    return () => {
      // Invalidate words queries when we leave exercise
      queryClient.invalidateQueries(wordKeys.lists());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <Alert severity="error">{error.response?.data?.message || error.message}</Alert>;
  }

  if (isFetching) {
    return <Loader />;
  }

  if (!words) {
    return <Alert severity="info">Empty...</Alert>;
  }

  if (!currentWord) {
    return (
      <>
        <Alert severity="success">Exersice completed</Alert>
        <Button variant="contained" onClick={() => router.push('/ex')}>
          Exercises list
        </Button>
      </>
    );
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={6} position="relative">
          <Form ref={formRef}>
            <ChineseInput
              name={INPUT_NAME}
              autoFocus
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
          </Form>
          <Box
            sx={{
              position: 'absolute',
              top: -12,
            }}
          >
            <Typography
              color="success.main"
              fontSize={14}
              sx={{
                opacity: isMovedToNextLevel ? 1 : 0,
                transition: (theme) => theme.transitions.create('opacity'),
              }}
            >
              Word moved to next level
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: 62,
            }}
          >
            <Box>
              {isTypingMistake && !lastPassedWord && (
                <Typography color="error.main">
                  {currentWord?.name} ({firstTranslation?.word_transcription})
                </Typography>
              )}
            </Box>
            <Box>
              {lastPassedWord && (
                <Typography color="success.main">
                  {lastPassedWord.name} (
                  {lastPassedWord.translations &&
                    lastPassedWord.translations[0]?.word_transcription}
                  )
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item sm={6}>
          <Typography fontWeight="bold">Translations</Typography>
          {currentWord?.translations?.map((translation) => {
            return <Typography>{translation.name}</Typography>;
          })}
        </Grid>
      </Grid>
      {firstExample && (
        <Box mt={4}>
          <Typography fontWeight="bold">Example</Typography>
          <Typography>
            {lastPassedWord
              ? firstExample.name
              : firstExample.name.replace(currentWord.name, '...')}
          </Typography>
          {firstExample.transcription && firstTranslation && (
            <Typography>
              {lastPassedWord
                ? firstExample.transcription
                : firstExample.transcription.replace(firstTranslation.word_transcription, '...')}
            </Typography>
          )}

          <Typography>{firstExample.translation}</Typography>
        </Box>
      )}
      <Box mt={4}>
        <Typography>Words left: {words.length - index}</Typography>
      </Box>
    </>
  );
};
