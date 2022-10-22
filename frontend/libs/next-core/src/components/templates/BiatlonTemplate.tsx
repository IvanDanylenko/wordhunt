import { useState, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Box, Typography, Grid, Alert } from '@mui/material';
import { useGetWords, useIncreaseLevelMutation } from '../../hooks';
import { Word } from '../../types';
import { ChineseInput, ChineseInputProps, Loader } from '../atoms';
import { Form } from '../molecules';

const INPUT_NAME = 'chinese';

export const BiatlonTemplate = () => {
  const [index, setIndex] = useState(0);

  const [lastPassedWord, setLastPassedWord] = useState<Word | null>(null);

  const [isTypingMistake, setIsTypingMistake] = useState(false);

  const [isMovedToNextLevel, setIsMovedToNextLevel] = useState(false);

  const formRef = useRef<UseFormReturn>(null);

  const { data: words, error, isLoading } = useGetWords('in_progress');

  const { mutate: increaseLevel } = useIncreaseLevelMutation();

  if (error) {
    return <Alert severity="error">{error.response?.data?.message || error.message}</Alert>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!words) {
    return <Alert severity="info">Empty...</Alert>;
  }

  const moveToNextWord = () => {
    setIndex((v) => v + 1);
    setIsTypingMistake(false);
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
    } else if (currentWord?.name === newValue) {
      if (isTypingMistake) {
        moveToNextWord();
      } else {
        if (formRef.current) {
          formRef.current.setValue(INPUT_NAME, '');
        }

        increaseLevel(currentWord?.id);
        moveToNextWord();
        setIsMovedToNextLevel(true);
        setLastPassedWord(currentWord);
        setTimeout(() => {
          setIsMovedToNextLevel(false);
        }, 4000);
      }
    }
  };

  const currentWord = words[index];

  const firstTranslation = currentWord?.translations && currentWord.translations[0];

  if (!currentWord) {
    return <Alert severity="success">Exersice completed...</Alert>;
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <Form ref={formRef}>
            <ChineseInput
              name={INPUT_NAME}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
          </Form>
          <Box>
            {isTypingMistake && (
              <Typography color="error.main">
                {currentWord?.name} ({firstTranslation?.word_transcription})
              </Typography>
            )}
          </Box>
          <Box>
            {isMovedToNextLevel && (
              <Typography color="success.main">
                {lastPassedWord?.name} moved to next level
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item sm={6}>
          <Typography fontWeight="bold">Translations</Typography>
          {currentWord?.translations?.map((translation) => {
            return <Typography>{translation.name}</Typography>;
          })}
        </Grid>
      </Grid>
      <Box mt={4}>
        <Typography>Words left: {words.length - index}</Typography>
      </Box>
    </>
  );
};
