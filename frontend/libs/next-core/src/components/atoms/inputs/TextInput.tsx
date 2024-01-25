import { FC } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { StandardTextFieldProps, Typography } from '@mui/material';
import { TextInputView } from './views';

export interface TextInputProps
  extends UseControllerProps,
    Omit<StandardTextFieldProps, 'name' | 'defaultValue'> {}

export const TextInput: FC<TextInputProps> = (props) => {
  const { name, placeholder, type, ...rest } = props;

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    ...rest,
  });

  return (
    <TextInputView
      type={type}
      placeholder={placeholder}
      error={!!error}
      helperText={
        !!error && (
          <Typography component="span" variant="body2">
            {error?.message}
          </Typography>
        )
      }
      {...field}
      {...rest}
    />
  );
};
