import { FC, ReactNode } from 'react';
import { Grid } from '@mui/material';
import { RadioButtonCheckedIcon, RadioButtonUncheckedIcon } from '../../../../icons';

type WordRadioStatus = 'known' | 'unknown' | 'none';

export interface WordRadioInputViewProps {
  status: WordRadioStatus;
  word?: ReactNode;
  onChange: (value: WordRadioStatus) => void;
}

const KnownIcon = () => {
  return <RadioButtonCheckedIcon color="success" />;
};

const UnknownIcon = () => {
  return <RadioButtonCheckedIcon color="error" />;
};

const nextStatus = {
  none: 'unknown',
  unknown: 'known',
  known: 'none',
} as const;

export const WordRadioInputView: FC<WordRadioInputViewProps> = (props) => {
  const { status, word, onChange } = props;

  const Icon =
    status === 'none' ? RadioButtonUncheckedIcon : status === 'known' ? KnownIcon : UnknownIcon;

  return (
    <Grid
      container
      alignItems="center"
      spacing={1}
      sx={{ cursor: 'pointer' }}
      onClick={() => {
        onChange(nextStatus[status]);
      }}
    >
      <Grid item display="flex">
        <Icon />
      </Grid>
      <Grid item>{word}</Grid>
    </Grid>
  );
};
