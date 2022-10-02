import { Grid } from '@mui/material';
import { FC, ReactNode } from 'react';
import { RadioButtonCheckedIcon, RadioButtonUncheckedIcon } from '../../../../icons';

export interface WordRadioInputViewProps {
  status?: 'known' | 'unknown' | 'none';
  word?: ReactNode;
}

const KnownIcon = () => {
  return <RadioButtonCheckedIcon color="success" />;
};

const UnknownIcon = () => {
  return <RadioButtonCheckedIcon color="error" />;
};

export const WordRadioInputView: FC<WordRadioInputViewProps> = (props) => {
  const { status = 'none', word } = props;

  const Icon =
    status === 'none' ? RadioButtonUncheckedIcon : status === 'known' ? KnownIcon : UnknownIcon;

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Icon />
      </Grid>
      <Grid item>{word}</Grid>
    </Grid>
  );
};
