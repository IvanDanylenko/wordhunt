import { FC } from 'react';
import { useFormState } from 'react-hook-form';
import { Button, ButtonProps } from './Button';

export type SubmitButtonProps = ButtonProps;

export const SubmitButton: FC<SubmitButtonProps> = (props) => {
  const { isSubmitting } = useFormState();

  return <Button loading={isSubmitting} type="submit" {...props} />;
};
