import { FC, forwardRef } from 'react';
import { UseControllerProps } from 'react-hook-form';
import { StandardTextFieldProps, TextField } from '@mui/material';

export interface TextInputViewProps
  extends Omit<UseControllerProps, 'name' | 'defaultValue'>,
    StandardTextFieldProps {}

export const TextInputView: FC<TextInputViewProps> = forwardRef((props, ref) => {
  const { inputProps, sx, ...rest } = props;

  return (
    <TextField
      ref={ref}
      {...rest}
      sx={{
        '.MuiInputBase-root': {
          borderRadius: 0,
          height: 40,
          backgroundColor: 'background.paper',
        },
        fieldset: {
          transition: '0.3s',
        },
        ...sx,
      }}
      fullWidth
      inputProps={{ sx: { transition: '0.3s' }, ...inputProps }}
    />
  );
});
