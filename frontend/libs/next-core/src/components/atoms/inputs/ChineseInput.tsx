import { useMemo, useState, useEffect, forwardRef } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {
  Box,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  tooltipClasses,
  StandardTextFieldProps,
} from '@mui/material';
import { useGetChineseSuggestions } from '../../../hooks';
import { TextInputView, TextInputViewProps } from './views/TextInputView';

export interface ChineseInputProps
  extends UseControllerProps,
    Omit<StandardTextFieldProps, 'name' | 'defaultValue'> {}

const SELECT_KEYS = ['1', '2', '3', '4', '5'];

export const ChineseInput = forwardRef<HTMLInputElement, ChineseInputProps>((props, ref) => {
  const { name, placeholder, type, onKeyDown, onChange, ...rest } = props;

  const [inputValue, setInputValue] = useState('');

  const [selectionLine, setSelectionLine] = useState(0);

  const { data: suggestions } = useGetChineseSuggestions({
    text: inputValue,
    count: selectionLine * 5 + 5,
  });

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    defaultValue: '',
    ...rest,
  });

  const handleInputChange = (value: string) => {
    const formattedValue = value.replace(/[^a-z\s]/gi, '');
    const latestWord = formattedValue.split(' ').at(-1);

    setInputValue(latestWord || '');
  };

  const handleKeyDown: TextInputViewProps['onKeyDown'] = (e) => {
    if (onKeyDown) {
      onKeyDown(e);
    }

    if (!inputValue) return;

    if (!suggestions) return;

    if (e.code === 'ArrowDown') {
      setSelectionLine((v) => v + 1);
      return;
    }

    if (e.code === 'ArrowUp') {
      setSelectionLine((v) => (v > 0 ? v - 1 : 0));
      return;
    }

    if (SELECT_KEYS.includes(e.key)) {
      const selectedChar = suggestions[selectionLine * 5 + Number(e.key) - 1];
      field.onChange((v: string) => {
        const newValue = v.replace(new RegExp(inputValue + '$'), selectedChar);

        return newValue;
      });
    }
  };

  const handleChange: TextInputViewProps['onChange'] = (e) => {
    const value = e.target.value || '';
    const newValue = value.replace(/\d/g, '');

    field.onChange(newValue);

    if (onChange) {
      onChange(e);
    }

    handleInputChange(newValue || '');
  };

  useEffect(() => {
    setSelectionLine(0);
  }, [inputValue]);

  /**
   * Render chars suggestions list
   */
  const renderSuggestions = useMemo(() => {
    if (!suggestions) return null;

    const charsSubset = suggestions.slice(selectionLine * 5, selectionLine * 5 + 5);

    return charsSubset.map((char, index) => {
      return (
        <Typography
          key={char}
          sx={{
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: (theme) => theme.transitions.create('backgroundColor'),
            ':hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          {index + 1}. {char}
        </Typography>
      );
    });
  }, [suggestions, selectionLine]);

  return (
    <Tooltip
      open={!!inputValue && !!field.value}
      PopperProps={{
        sx: {
          [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            minWidth: 280,
            maxWidth: 500,
            fontSize: 12,
            border: '1px solid #dadde9',
          },
        },
      }}
      title={
        <Box
          sx={{
            p: 1,
            '& input': {
              typography: 'body1',
              display: 'block',
              width: 1,
              border: 'none',
              outline: 'none',
            },
          }}
        >
          <Typography>{inputValue}&nbsp;</Typography>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs={9} container gap={1} flexWrap="nowrap">
              {renderSuggestions}
            </Grid>
            <Grid item xs={3} container spacing={0.5}>
              <Grid item xs={6}>
                <IconButton
                  size="small"
                  disabled={selectionLine <= 0}
                  onClick={() => setSelectionLine((v) => v - 1)}
                >
                  <ArrowUpwardIcon />
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                <IconButton size="small" onClick={() => setSelectionLine((v) => v + 1)}>
                  <ArrowDownwardIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      }
    >
      <TextInputView
        inputRef={ref}
        helperText={
          !!error && (
            <Typography component="span" variant="body2">
              {error?.message}
            </Typography>
          )
        }
        {...rest}
        value={field.value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </Tooltip>
  );
});
