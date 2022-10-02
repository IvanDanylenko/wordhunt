import { FC, ReactNode } from 'react';
import { FieldValues, FormProvider, useForm, UseFormProps, UseFormSetError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { AnyObjectSchema } from 'yup';
import { getMessageFromError } from '../../../utils';
import { useNotify } from '../../../hooks';

interface FormProps extends UseFormProps {
  children: ReactNode;
  // Used "any" to make process of specifying form values types easier
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => Promise<void>;
  validationSchema?: AnyObjectSchema;
}

function setSubmissionErrors(
  errors?: Record<string, string[]>,
  setError?: UseFormSetError<FieldValues>,
) {
  if (!errors || !setError) {
    return;
  }
  return Object.keys(errors).forEach((key) => {
    setError(key, {
      type: 'server',
      message: errors[key].join('. '),
    });
  });
}

export const Form: FC<FormProps> = ({ children, onSubmit, validationSchema, ...rest }) => {
  const form = useForm({
    resolver: validationSchema && yupResolver(validationSchema),
    ...rest,
  });

  const notify = useNotify();

  const handleSubmit = async (values: unknown) => {
    try {
      await onSubmit(values);
    } catch (error) {
      const typedError = error as AxiosError<{
        message: string;
        errors?: Record<string, string[]>;
      }>;
      const errors = typedError?.response?.data?.errors;

      if (errors) {
        setSubmissionErrors(errors, form.setError);
      } else {
        notify(getMessageFromError(error), { type: 'error' });
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
        {children}
      </form>
    </FormProvider>
  );
};
