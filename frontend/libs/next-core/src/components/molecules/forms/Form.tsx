import { ReactNode, forwardRef } from 'react';
import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormProps,
  UseFormSetError,
  UseFormReturn,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { AnyObjectSchema } from 'yup';
import { useNotify } from '../../../hooks';
import { getMessageFromError } from '../../../utils';

interface FormProps extends UseFormProps {
  children: ReactNode;
  // Used "any" to make process of specifying form values types easier
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (data: any) => Promise<void>;
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

export const Form = forwardRef<UseFormReturn, FormProps>((props, ref) => {
  const { children, onSubmit, validationSchema, ...rest } = props;

  const form = useForm({
    resolver: validationSchema && yupResolver(validationSchema),
    ...rest,
  });

  if (ref && typeof ref === 'object') {
    ref.current = form;
  }

  const notify = useNotify();

  const handleSubmit = async (values: unknown) => {
    if (!onSubmit) return;

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
});
