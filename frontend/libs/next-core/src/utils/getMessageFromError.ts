import { AxiosError } from 'axios';

export const getMessageFromError = (error?: unknown, source?: string): string => {
  const typedError = error as AxiosError<{ message: string; errors?: Record<string, string[]> }>;

  if (source) {
    const errors = typedError?.response?.data?.errors;
    if (!errors || !errors[source]) {
      return '';
    }

    return errors[source][0];
  }

  return typedError?.response?.data?.message || typedError?.message || 'notification.http_error';
};
